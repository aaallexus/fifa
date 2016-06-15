$(document).ready(function(){
	$('#showRightMenu').click(function(){
		var menu=$(this).next();
		$('<div class="dialog-background"></div>').insertBefore(menu).click(function(){
			menu.hide();
			$(this).remove();
		});
		menu.show();
		return false;
	});
});