const TimestampChecker = require('./timestamp-checker');
const fs = require('fs');
const path = require('path');

/**
 * Intégration Hexo pour la vérification temporelle des fichiers
 * Ce script s'intègre avec le système de build Hexo via les hooks
 */

// Configuration par défaut
const DEFAULT_CONFIG = {
    timestamp_threshold: 24,
    source_files: ['./twt.json'],
    output_files: ['source/_posts/twitter.md'],
    log_enabled: true
};

/**
 * Gestionnaire principal pour l'optimisation du build
 */
class HexoBuildOptimizer {
    constructor(hexo) {
        this.hexo = hexo;
        this.config = this.loadConfig();
        this.timestampChecker = new TimestampChecker({
            thresholdHours: this.config.timestamp_threshold,
            logEnabled: this.config.log_enabled
        });
    }

    /**
     * Charge la configuration depuis Hexo
     */
    loadConfig() {
        const hexoConfig = this.hexo.config.build_optimization || {};
        return {
            ...DEFAULT_CONFIG,
            ...hexoConfig
        };
    }

    /**
     * Vérifie si les fichiers sources nécessitent une mise à jour
     * @returns {Promise<boolean>} - true si une mise à jour est nécessaire
     */
    async checkFilesForUpdate() {
        const results = [];
        
        try {
            // Vérifier chaque paire source/output
            for (let i = 0; i < this.config.source_files.length; i++) {
                const sourceFile = this.config.source_files[i];
                const outputFile = this.config.output_files[i] || null;
                
                const result = this.timestampChecker.checkUpdateRequired(
                    sourceFile, 
                    outputFile, 
                    this.config.timestamp_threshold
                );
                
                results.push(result);
                
                this.log(`Vérification ${sourceFile}:`);
                this.log(`  - Âge: ${result.sourceAge.toFixed(2)}h`);
                this.log(`  - Périmé: ${result.isSourceStale}`);
                this.log(`  - Mise à jour requise: ${result.updateRequired}`);
                this.log(`  - Raison: ${result.reason}`);
            }
            
            // Retourner true si au moins un fichier nécessite une mise à jour
            const updateRequired = results.some(result => result.updateRequired);
            
            this.log(`Décision globale: ${updateRequired ? 'MISE À JOUR NÉCESSAIRE' : 'AUCUNE MISE À JOUR'}`);
            
            return {
                updateRequired,
                results,
                summary: {
                    totalFiles: results.length,
                    filesToUpdate: results.filter(r => r.updateRequired).length,
                    staleFiles: results.filter(r => r.isSourceStale).length
                }
            };
            
        } catch (error) {
            this.log(`Erreur lors de la vérification des fichiers: ${error.message}`);
            // En cas d'erreur, on force la mise à jour par sécurité
            return {
                updateRequired: true,
                results: [],
                error: error.message
            };
        }
    }

    /**
     * Exécute la logique de mise à jour conditionnelle
     * Cette méthode est appelée par le hook Hexo
     */
    async executeConditionalUpdate() {
        this.log('=== Début de la vérification temporelle des fichiers ===');
        
        const checkResult = await this.checkFilesForUpdate();
        
        if (checkResult.error) {
            this.log(`Erreur détectée: ${checkResult.error}`);
            this.log('Poursuite du build par sécurité...');
            return true; // Continuer le build
        }
        
        if (!checkResult.updateRequired) {
            this.log('Aucune mise à jour nécessaire - optimisation du build activée');
            this.log(`Fichiers vérifiés: ${checkResult.summary.totalFiles}`);
            this.log(`Fichiers périmés: ${checkResult.summary.staleFiles}`);
            
            // Ici on pourrait implémenter une logique pour skip certaines étapes du build
            // Pour l'instant, on laisse le build continuer normalement
            return true;
        }
        
        this.log('Mise à jour nécessaire - build complet');
        this.log(`Fichiers à mettre à jour: ${checkResult.summary.filesToUpdate}`);
        
        // Marquer les fichiers qui nécessitent une mise à jour
        this.markFilesForUpdate(checkResult.results);
        
        this.log('=== Fin de la vérification temporelle des fichiers ===');
        return true;
    }

    /**
     * Marque les fichiers qui nécessitent une mise à jour
     * @param {Array} results - Résultats de la vérification
     */
    markFilesForUpdate(results) {
        const filesToUpdate = results.filter(result => result.updateRequired);
        
        if (filesToUpdate.length > 0) {
            this.log('Fichiers marqués pour mise à jour:');
            filesToUpdate.forEach(result => {
                this.log(`  - ${result.sourceFile} -> ${result.targetFile || 'N/A'}`);
            });
            
            // Stocker les informations pour d'autres parties du build
            this.hexo.locals.set('files_to_update', filesToUpdate);
        }
    }

    /**
     * Obtient un rapport détaillé de l'état des fichiers
     */
    getDetailedReport() {
        const report = {
            timestamp: new Date().toISOString(),
            config: this.config,
            files: []
        };

        this.config.source_files.forEach((sourceFile, index) => {
            const outputFile = this.config.output_files[index] || null;
            const metadata = this.timestampChecker.getFileMetadata(sourceFile);
            const outputMetadata = outputFile ? this.timestampChecker.getFileMetadata(outputFile) : null;
            
            report.files.push({
                source: {
                    path: sourceFile,
                    metadata: metadata
                },
                output: {
                    path: outputFile,
                    metadata: outputMetadata
                },
                updateRequired: metadata ? !metadata.isStale : false
            });
        });

        return report;
    }

    /**
     * Log conditionnel
     */
    log(message) {
        if (this.config.log_enabled) {
            console.log(`[HexoBuildOptimizer] ${message}`);
        }
    }
}

/**
 * Enregistrement du hook Hexo
 * Ce code s'exécute quand Hexo charge ce script
 */
if (typeof hexo !== 'undefined') {
    // Hook before_generate - s'exécute avant la génération des pages
    hexo.extend.filter.register('before_generate', async function() {
        const optimizer = new HexoBuildOptimizer(this);
        return await optimizer.executeConditionalUpdate();
    });

    // Hook optionnel pour after_generate si on veut faire du nettoyage
    hexo.extend.filter.register('after_generate', function() {
        console.log('[HexoBuildOptimizer] Build terminé avec optimisation temporelle');
    });

    // Commande personnalisée pour obtenir un rapport
    hexo.extend.console.register('build-report', 'Génère un rapport de l\'état des fichiers', {}, function(args) {
        const optimizer = new HexoBuildOptimizer(this);
        const report = optimizer.getDetailedReport();
        
        console.log('=== RAPPORT D\'ÉTAT DES FICHIERS ===');
        console.log(JSON.stringify(report, null, 2));
        
        return Promise.resolve();
    });
}

// Export pour utilisation dans d'autres contextes
module.exports = {
    HexoBuildOptimizer,
    TimestampChecker
};