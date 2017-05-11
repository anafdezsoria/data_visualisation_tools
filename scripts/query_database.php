<?php
	header('Access-Control-Allow-Origin: *');
	
	$drupal_path = "../";
	define('DRUPAL_ROOT', $drupal_path);
	
	include_once DRUPAL_ROOT . '/includes/bootstrap.inc';
	
	$cdir = getcwd();
	drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
	
	$query = db_query ("SELECT field_data_type_tid,field_data_visualisation_type_tid,field_interactivity_tid,count(distinct nid) as 'num_tools'
	FROM data_visualisation.field_data_body 
	left join data_visualisation.node on field_data_body.entity_id = node.nid 
	left join data_visualisation.field_data_field_data_visualisation_type on field_data_field_data_visualisation_type.entity_id = node.nid 
	left join data_visualisation.field_data_field_data_type on field_data_field_data_type.entity_id = node.nid 
	left join data_visualisation.field_data_field_interactivity on field_data_field_interactivity.entity_id = node.nid
	where type='tool' and status=1
	group by field_data_type_tid,field_data_visualisation_type_tid,field_interactivity_tid");
	
	$result = $query->fetchAll();
	
	$cad = "'ID','Data Type','Visualisation Type','Interaction Type','Num Tools'";
	foreach ($result as $record) {
		if ($record->field_interactivity_tid == 60)
			$cad .= "," . "Static" . "," . $record->field_data_type_tid . "," . $record->field_data_visualisation_type_tid . ",Static," . $record->num_tools ;
		else
			$cad .= "," . "Dynamic" . "," . $record->field_data_type_tid . "," . $record->field_data_visualisation_type_tid . ",Dynamic," . $record->num_tools ;
	}
	
	echo $cad;

?>