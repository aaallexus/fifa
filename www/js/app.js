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
	$('#regform').submit(function(){
		var login=$('input[name=login]',this);
		var password=$('input[name=password]',this);
		var passwordRepeat=$('input[name=repeat_password]',this);
		var email=$('input[name=email]',this);
		var returnValue=true;
		$('input[type=text]',this).each(function(){
			if(this.value==='')
			{
				$(this).addClass('has-error');
				returnValue=false;
			}
		});
		if(password.val()==='')
		{
			$(password).addClass('has-error');
			return false;
		}
		if(password.val()!==passwordRepeat.val())
		{
			$(password).addClass('has-error');
			$(passwordRepeat).addClass('has-error');
			return false;
		}
		return returnValue;
	});
	$('#regform').on('input','.has-error',function(){
		$(this).removeClass('has-error');
	});
});