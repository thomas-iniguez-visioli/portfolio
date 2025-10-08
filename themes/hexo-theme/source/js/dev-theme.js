/**
 * Developer Theme JavaScript
 * Enhances the developer theme with interactive features
 * Requirements: 5.1, 5.2 - Maintainable and extensible system
 */

(function() {
  'use strict';

  // Theme initialization
  function initDeveloperTheme() {
    console.log('🎨 Developer theme initialized');
    
    // Add theme classes to body
    document.body.classList.add('dev-theme-loaded');
    
    // Initialize responsive behavior
    initResponsiveBehavior();
    
    // Initialize sidebar interactions
    initSidebarInteractions();
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
  }

  // Responsive behavior
  function initResponsiveBehavior() {
    const sidebar = document.getElementById('dev-sidebar');
    const toggle = document.querySelector('.dev-sidebar-toggle');
    
    if (!sidebar || !toggle) return;
    
    // Handle sidebar toggle
    toggle.addEventListener('click', function() {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      sidebar.classList.toggle('dev-sidebar--collapsed', isExpanded);
      
      // Update body class for layout adjustments
      document.body.classList.toggle('sidebar-collapsed', isExpanded);
    });
    
    // Handle responsive breakpoints
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    function handleBreakpointChange(e) {
      if (e.matches) {
        // Mobile: hide sidebar by default
        sidebar.classList.add('dev-sidebar--mobile');
        toggle.style.display = 'flex';
      } else {
        // Desktop: show sidebar
        sidebar.classList.remove('dev-sidebar--mobile');
        toggle.style.display = 'none';
      }
    }
    
    mediaQuery.addListener(handleBreakpointChange);
    handleBreakpointChange(mediaQuery);
  }

  // Sidebar interactions
  function initSidebarInteractions() {
    const techBadges = document.querySelectorAll('.dev-tech-badge');
    
    techBadges.forEach(badge => {
      badge.addEventListener('mouseenter', function() {
        const tech = this.getAttribute('data-tech');
        if (tech) {
          this.setAttribute('title', `Technology: ${tech}`);
        }
      });
    });
    
    // Navigation link active states
    const navLinks = document.querySelectorAll('.dev-nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active');
      }
    });
  }

  // Keyboard shortcuts
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      // Only handle shortcuts when not in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Cmd/Ctrl + shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch(e.key) {
          case 'h':
            e.preventDefault();
            navigateToHome();
            break;
          case 'a':
            e.preventDefault();
            navigateToAbout();
            break;
          case 'p':
            e.preventDefault();
            navigateToArticles();
            break;
          case 'j':
            e.preventDefault();
            navigateToJournal();
            break;
        }
      }
    });
  }

  // Navigation functions
  function navigateToHome() {
    const homeLink = document.querySelector('[data-nav="home"]');
    if (homeLink) homeLink.click();
  }

  function navigateToAbout() {
    const aboutLink = document.querySelector('[data-nav="about"]');
    if (aboutLink) aboutLink.click();
  }

  function navigateToArticles() {
    const articlesLink = document.querySelector('[data-nav="articles"]');
    if (articlesLink) articlesLink.click();
  }

  function navigateToJournal() {
    const journalLink = document.querySelector('[data-nav="journal"]');
    if (journalLink) journalLink.click();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeveloperTheme);
  } else {
    initDeveloperTheme();
  }

  // Export for testing
  window.DevTheme = {
    init: initDeveloperTheme,
    responsive: initResponsiveBehavior,
    sidebar: initSidebarInteractions,
    shortcuts: initKeyboardShortcuts
  };

})();