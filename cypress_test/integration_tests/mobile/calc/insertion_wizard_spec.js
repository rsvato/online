/* global describe it cy beforeEach require afterEach expect*/

var helper = require('../../common/helper');
var calcHelper = require('../../common/calc_helper');
var mobileHelper = require('../../common/mobile_helper');
var calcMobileHelper = require('./calc_mobile_helper');

describe('Calc insertion wizard.', function() {
	var testFileName = 'insertion_wizard.ods';

	beforeEach(function() {
		mobileHelper.beforeAllMobile(testFileName, 'calc');

		// Click on edit button
		mobileHelper.enableEditingMobile();

		calcHelper.clickOnFirstCell();

		cy.get('.leaflet-marker-icon')
			.should('be.visible');

		mobileHelper.openInsertionWizard();
	});

	afterEach(function() {
		helper.afterAll(testFileName);
	});

	it('Check existence of image insertion items.', function() {
		cy.contains('.menu-entry-with-icon', 'Local Image...')
			.should('be.visible');

		cy.contains('.menu-entry-with-icon', 'Image...')
			.should('be.visible');
	});

	it('Insert chart.', function() {
		cy.contains('.menu-entry-with-icon', 'Chart...')
			.click();

		cy.get('.leaflet-drag-transform-marker')
			.should('have.length', 8);
	});

	it('Insert hyperlink.', function() {
		cy.contains('.menu-entry-with-icon', 'Hyperlink...')
			.click();

		// Dialog is opened
		cy.get('.vex-content.hyperlink-dialog')
			.should('exist');

		// Type text and link
		cy.get('.vex-content.hyperlink-dialog input[name="text"]')
			.clear()
			.type('some text');
		cy.get('.vex-content.hyperlink-dialog input[name="link"]')
			.type('www.something.com');

		// Insert
		cy.get('.vex-content.hyperlink-dialog .vex-dialog-button-primary')
			.click();

		cy.get('.blinking-cursor')
			.should('be.visible');

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td a')
			.should('have.text', 'some text');

		cy.get('#copy-paste-container table td a')
			.should('have.attr', 'href', 'http://www.something.com');
	});

	it('Insert shape.', function() {
		// Do insertion
		cy.contains('.menu-entry-with-icon', 'Shape')
			.click();

		cy.get('.basicshapes_ellipse').
			click();

		// Check that the shape is there
		cy.get('.leaflet-pane.leaflet-overlay-pane svg g')
			.should('exist');

		cy.get('.leaflet-pane.leaflet-overlay-pane svg')
			.should(function(svg) {
				expect(svg[0].getBBox().width).to.be.greaterThan(0);
				expect(svg[0].getBBox().height).to.be.greaterThan(0);
			});
	});

	it('Insert date.', function() {
		// Do insertion
		cy.contains('.menu-entry-with-icon', 'Date')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'sdnum', '1033;0;MM/DD/YY');
	});

	it('Insert time.', function() {
		// Do insertion
		cy.contains('.menu-entry-with-icon', 'Time')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'sdnum', '1033;0;HH:MM:SS AM/PM');
	});
});
