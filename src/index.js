import 'bootstrap';
import $ from 'jquery';
import './styles/main.scss';

import { domContent } from './js/domContent';

window.jQuery = $;
window.$ = $;
/* eslint-disable no-multi-assign, no-undef */

// const jQuery = require('jquery');

// global.$ = global.jQuery = jQuery;
// window.$ = window.jQuery = jQuery;

$('#myModal').on('shown.bs.modal', () => {
  $('#myInput').trigger('focus');
});

domContent();
