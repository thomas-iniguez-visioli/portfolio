const fs = require('fs');
const path = require('path');

/**
 * TimestampChecker - Module pour vérifier l'âge des fichiers et décider des mises à jour
 * Utilisé dans le système de build Hexo pour optimiser les performances
 */
class TimestampChecker {
    constructor(options = {}) {
        this.thresholdHours = options.thresholdHours || 24;
        this.logEnabled = options.logEnabled !== false;
    }

    /**
     * Vérifie l'âge d'un fichier en heures
     * @param {string} filePath - Chemin vers le fichier
     * @returns {number} - Âge du fichier en heures, -1 si le fichier n'existe pas
     */
    checkFileAge(filePath) {
        try {
            if (!fs.existsSync(filePath)) {
                this.log(`Fichier non trouvé: ${filePath}`);
                return -1;
            }

            const stats = fs.statSync(filePath);
            const now = new Date();
            const fileModTime = new Date(stats.mtime);
            const ageInHours = (now - fileModTime) / (1000 * 60 * 60);

            this.log(`Fichier ${filePath}: âge = ${ageInHours.toFixed(2)} heures`);
            return ageInHours;
        } catch (error) {
            this.log(`Erreur lors de la vérification du fichier ${filePath}: ${error.message}`);
            return -1;
        }
    }

    /**
     * Détermine si un fichier est périmé (plus ancien que le seuil)
     * @param {string} filePath - Chemin vers le fichier
     * @param {number} thresholdHours - Seuil en heures (optionnel, utilise la valeur par défaut si non fourni)
     * @returns {boolean} - true si le fichier est périmé ou n'existe pas
     */
    isFileStale(filePath, thresholdHours = null) {
        const threshold = thresholdHours !== null ? thresholdHours : this.thresholdHours;
        const ageInHours = this.checkFileAge(filePath);
        
        // Si le fichier n'existe pas, on considère qu'il faut le créer
        if (ageInHours === -1) {
            this.log(`Fichier ${filePath} n'existe pas - considéré comme périmé`);
            return true;
        }

        const isStale = ageInHours > threshold;
        this.log(`Fichier ${filePath}: ${isStale ? 'PÉRIMÉ' : 'RÉCENT'} (seuil: ${threshold}h)`);
        return isStale;
    }

    /**
     * Compare l'âge de deux fichiers et détermine si une mise à jour est nécessaire
     * @param {string} sourceFile - Fichier source
     * @param {string} targetFile - Fichier cible
     * @returns {boolean} - true si le fichier source est plus récent que la cible ou si la cible n'existe pas
     */
    shouldUpdate(sourceFile, targetFile) {
        try {
            // Si le fichier cible n'existe pas, on doit le créer
            if (!fs.existsSync(targetFile)) {
                this.log(`Fichier cible ${targetFile} n'existe pas - mise à jour nécessaire`);
                return true;
            }

            // Si le fichier source n'existe pas, pas de mise à jour
            if (!fs.existsSync(sourceFile)) {
                this.log(`Fichier source ${sourceFile} n'existe pas - pas de mise à jour`);
                return false;
            }

            const sourceStats = fs.statSync(sourceFile);
            const targetStats = fs.statSync(targetFile);
            
            const sourceTime = new Date(sourceStats.mtime);
            const targetTime = new Date(targetStats.mtime);
            
            const shouldUpdate = sourceTime > targetTime;
            this.log(`Comparaison ${sourceFile} vs ${targetFile}: ${shouldUpdate ? 'MISE À JOUR NÉCESSAIRE' : 'À JOUR'}`);
            this.log(`  Source: ${sourceTime.toISOString()}`);
            this.log(`  Cible:  ${targetTime.toISOString()}`);
            
            return shouldUpdate;
        } catch (error) {
            this.log(`Erreur lors de la comparaison ${sourceFile} vs ${targetFile}: ${error.message}`);
            // En cas d'erreur, on force la mise à jour par sécurité
            return true;
        }
    }

    /**
     * Vérifie si un fichier source nécessite une mise à jour basée sur l'âge ET la comparaison avec la cible
     * @param {string} sourceFile - Fichier source
     * @param {string} targetFile - Fichier cible (optionnel)
     * @param {number} thresholdHours - Seuil en heures (optionnel)
     * @returns {object} - Objet avec les détails de la décision
     */
    checkUpdateRequired(sourceFile, targetFile = null, thresholdHours = null) {
        const result = {
            sourceFile,
            targetFile,
            updateRequired: false,
            reason: '',
            sourceAge: -1,
            isSourceStale: false
        };

        // Vérifier l'âge du fichier source
        result.sourceAge = this.checkFileAge(sourceFile);
        result.isSourceStale = this.isFileStale(sourceFile, thresholdHours);

        // Si le fichier source est périmé (plus de 24h), pas de mise à jour
        if (result.isSourceStale && result.sourceAge > 0) {
            result.updateRequired = false;
            result.reason = `Fichier source périmé (${result.sourceAge.toFixed(2)}h > ${thresholdHours || this.thresholdHours}h)`;
            this.log(`Décision: ${result.reason}`);
            return result;
        }

        // Si pas de fichier cible spécifié, se baser uniquement sur l'âge du source
        if (!targetFile) {
            result.updateRequired = !result.isSourceStale;
            result.reason = result.updateRequired ? 
                `Fichier source récent (${result.sourceAge.toFixed(2)}h)` : 
                `Fichier source périmé`;
            this.log(`Décision: ${result.reason}`);
            return result;
        }

        // Comparer avec le fichier cible
        const shouldUpdateBasedOnComparison = this.shouldUpdate(sourceFile, targetFile);
        
        if (result.isSourceStale) {
            result.updateRequired = false;
            result.reason = `Fichier source périmé, pas de mise à jour nécessaire`;
        } else if (shouldUpdateBasedOnComparison) {
            result.updateRequired = true;
            result.reason = `Fichier source récent et plus récent que la cible`;
        } else {
            result.updateRequired = false;
            result.reason = `Fichier cible déjà à jour`;
        }

        this.log(`Décision finale: ${result.reason}`);
        return result;
    }

    /**
     * Obtient les métadonnées d'un fichier
     * @param {string} filePath - Chemin vers le fichier
     * @returns {object|null} - Métadonnées du fichier ou null si erreur
     */
    getFileMetadata(filePath) {
        try {
            if (!fs.existsSync(filePath)) {
                return null;
            }

            const stats = fs.statSync(filePath);
            const ageInHours = this.checkFileAge(filePath);
            
            return {
                filePath: path.resolve(filePath),
                lastModified: new Date(stats.mtime),
                size: stats.size,
                ageInHours: ageInHours,
                isStale: this.isFileStale(filePath)
            };
        } catch (error) {
            this.log(`Erreur lors de la récupération des métadonnées pour ${filePath}: ${error.message}`);
            return null;
        }
    }

    /**
     * Log conditionnel
     * @param {string} message - Message à logger
     */
    log(message) {
        if (this.logEnabled) {
            console.log(`[TimestampChecker] ${message}`);
        }
    }

    /**
     * Configure le seuil de temps
     * @param {number} hours - Nouveau seuil en heures
     */
    setThreshold(hours) {
        this.thresholdHours = hours;
        this.log(`Seuil mis à jour: ${hours} heures`);
    }

    /**
     * Active ou désactive le logging
     * @param {boolean} enabled - État du logging
     */
    setLogging(enabled) {
        this.logEnabled = enabled;
    }
}

module.exports = TimestampChecker;