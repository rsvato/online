/* -*- js-indent-level: 8 -*- */
/*
 * L.Control.Notebookbar
 */

/* global $ */
L.Control.Notebookbar = L.Control.extend({
	options: {
		docType: ''
	},

	onAdd: function (map) {
		this.map = map;

		this.loadTab(this.getHomeTab());

		this.createScrollButtons();
		this.setupResizeHandler();
	},

	clearNotebookbar: function() {
		$('.root-container.notebookbar').remove();
		$('.ui-tabs.notebookbar').remove();
		$('.notebookbar-scroll-wrapper').remove();
	},

	loadTab: function(tabJSON) {
		this.clearNotebookbar();
		tabJSON = JSON.parse(tabJSON);
		var builder = new L.control.notebookbarBuilder({mobileWizard: this, map: this.map, cssClass: 'notebookbar'});

		var parent = $('#toolbar-up').get(0);
		var container = L.DomUtil.create('div', 'notebookbar-scroll-wrapper', parent);

		builder.build(container, [tabJSON]);
	},

	setTabs: function(tabs) {
		$('nav').prepend(tabs);
	},

	selectedTab: function(tabText) {
		console.log(tabText);
		switch (tabText) {
		case 'HomeLabel':
			this.loadTab(this.getHomeTab());
			break;

		case 'InsertLabel':
			this.loadTab(this.getInsertTab());
			break;

		case 'LayoutLabel':
			this.loadTab(this.getLayoutTab());
			break;
		
		case 'ReferencesLabel':
			this.loadTab(this.getReferencesTab());
			break;

		case 'TableLabel':
			this.loadTab(this.getTableTab());
			break;
		}
	},
	
	getTabs: function() {
		return [
			{
				'text': '~Home',
				'id': '2',
				'name': 'HomeLabel'
			},
			{
				'text': '~Insert',
				'id': '3',
				'name': 'InsertLabel'
			},
			{
				'text': '~Layout',
				'id': '4',
				'name': 'LayoutLabel'
			},
			{
				'text': 'Reference~s',
				'id': '5',
				'name': 'ReferencesLabel'
			},
			{
				'text': '~Table',
				'id': '8',
				'name': 'TableLabel'
			}
		];
	},

	// required, called by builder, not needed in this container
	setCurrentScrollPosition: function() {},

	createScrollButtons: function() {
		var parent = $('#toolbar-up').get(0);

		var left = L.DomUtil.create('div', 'w2ui-scroll-left', parent);
		var right = L.DomUtil.create('div', 'w2ui-scroll-right', parent);

		$(left).css({'height': '80px'});
		$(right).css({'height': '80px'});

		$(left).click(function () {
			var scroll = $('.notebookbar-scroll-wrapper').scrollLeft() - 300;
			$('.notebookbar-scroll-wrapper').animate({ scrollLeft: scroll }, 300);
			setTimeout(function () { $(window).resize(); }, 350);
		});

		$(right).click(function () {
			var scroll = $('.notebookbar-scroll-wrapper').scrollLeft() + 300;
			$('.notebookbar-scroll-wrapper').animate({ scrollLeft: scroll }, 300);
			setTimeout(function () { $(window).resize(); }, 350);
		});
	},

	setupResizeHandler: function() {
		var handler = function() {
			var container = $('#toolbar-up').get(0);
			var rootContainer = $('.notebookbar-scroll-wrapper table').get(0);

			if ($(rootContainer).outerWidth() > $(window).width()) {
				// we have overflowed content
				if ($('.notebookbar-scroll-wrapper').scrollLeft() > 0)
					$(container).find('.w2ui-scroll-left').show();
				else
					$(container).find('.w2ui-scroll-left').hide();

				if ($('.notebookbar-scroll-wrapper').scrollLeft() < $(rootContainer).outerWidth() - $(window).width() - 1)
					$(container).find('.w2ui-scroll-right').show();
				else
				$(container).find('.w2ui-scroll-right').hide();
			} else {
				$(container).find('.w2ui-scroll-left').hide();
				$(container).find('.w2ui-scroll-right').hide();
			}
		};

		$(window).resize(handler);
		$('.notebookbar-scroll-wrapper').scroll(handler);
	},

	getHomeTab: function() {
		return '';
	},

	getInsertTab: function() {
		return '';
	},

	getLayoutTab: function() {
		return '';
	},

	getReferencesTab: function() {
		return '';
	}
});

L.control.notebookbar = function (options) {
	return new L.Control.Notebookbar(options);
};