import 'bootstrap';
import './styles/main.scss';

import { domContent } from './js/domContent';

const jQuery = require('jquery');

/* eslint-disable no-multi-assign, no-undef */
// include jQuery in global and window scope (so you can access it globally)
// in your web browser, when you type $('.div'), it is actually refering to global.$('.div')
global.$ = global.jQuery = jQuery;
window.$ = window.jQuery = jQuery;


$('#myModal').on('shown.bs.modal', () => {
  $('#myInput').trigger('focus');
});

domContent();
