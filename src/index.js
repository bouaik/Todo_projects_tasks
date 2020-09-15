import './styles/main.scss'
import 'bootstrap'

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})
