$(document).ready(function() {

	createFormField();
	createForm(contenu_ar);

});

var contenu_ar =
[
	{
		_class : 'field-label',
		_label : 'Pseudo',
		_id : 'pseudo',
		_content : 'Toto',
		_class_icon : 'fa fa-pencil-square-o',
		_aria_hidden : true
	},
	{
		_class : 'field-label',
		_label : 'Password',
		_id : 'password',
		_content : '123',
		_class_icon : 'fa fa-pencil-square-o',
		_aria_hidden : true
	},
	{
		_class : 'field-label',
		_label : 'Nom',
		_id : 'nom',
		_content : 'Dupond',
		_class_icon : 'fa fa-pencil-square-o',
		_aria_hidden : true
	},
	{
		_class : 'field-label',
		_label : 'Prénom',
		_id : 'prenom',
		_content : 'Albert',
		_class_icon : 'fa fa-pencil-square-o',
		_aria_hidden : true
	},
	{
		_class : 'field-label',
		_label : 'Description',
		_id : 'description',
		_content : 'adupond@gmail.com',
		_class_icon : 'fa fa-pencil-square-o',
		_aria_hidden : true
	},
	{
		_class : 'field-label',
		_label : 'Email',
		_id : 'email',
		_content : 'Hello Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
		_class_icon : 'fa fa-pencil-square-o',
		_aria_hidden : true
	},
	{
		_class : 'field-label',
		_label : 'Email',
		_id : 'image-profil',
		_content : ["images/people/profil-2.jpg", "images/people/profil-3.jpg", "images/people/profil-1.jpg"],
		_class_icon : 'fa fa-pencil-square-o',
		_aria_hidden : true
	}
]

function createFormField(field_obj)
{
	var _class_str = field_obj._class;
	var _label_str = field_obj._label;
	var _id = field_obj._id;
	var _content = field_obj._content;
	var _class_icon = field_obj._class_icon;
	var _aria_hidden = field_obj._aria_hidden;

	// creation html
	var ul_container_obj 	= $('<ul/>');
	var li_label_obj 		= $('<li/>');
	var li_box_obj 			= $('<li/>');
	var li_btn_obj 			= $('<li/>');

	// add class & content
	$(li_label_obj).addClass(_class_str).html(_label_str);
	$(li_box_obj).attr('id', _id);
	$(li_btn_obj).append('<i/>').addClass(_class_icon).attr( "aria-hidden", _aria_hidden );

	// append html
	$(ul_container_obj)
		.append(li_label_obj)
		.append(li_box_obj)
		.append(li_btn_obj);
		
	console.log(ul_container_obj);

	$('.wrapper').prepend(ul_container_obj);

}

function createForm(contenu_field_obj)
{
	$.each(contenu_field_obj, function( index, value ) {
		//createFormField(value);
		console.log(value);
	});
}





