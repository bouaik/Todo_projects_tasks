import './styles/main.scss'
import 'bootstrap'

import { domContent } from './js/domContent'

var jQuery = require('jquery')

// include jQuery in global and window scope (so you can access it globally)
// in your web browser, when you type $('.div'), it is actually refering to global.$('.div')
global.$ = global.jQuery = jQuery;
window.$ = window.jQuery = jQuery;


$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

domContent()




