<header>
<div class="top-menu">
	<div class="row">
		<div class="col-md-8">
			<nav class='left-menu'>
			<?php
				topMenu();
			?>
			</nav>
		</div>
		<div class='col-md-4 pull-right text-right'>
			<nav class='right-menu'>
				<?php
					if(isset($_SESSION['user_id']))
					{
						include 'templates/main/user-menu.php';
					}
					else
					{
						include 'templates/main/auth-menu.php';
					}
				?>
			</nav>
		</div>
	</div>
</div>
</header>