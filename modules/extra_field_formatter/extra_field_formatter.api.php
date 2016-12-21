<?php
/**
 * @file
 * Hooks provided by Extra Field Formatter.
 */

/**
 * @addtogroup hooks
 * @{
 */

/**
 * Expose Extra Field formatter types.
 *
 * Formatters handle the display of extra field values.
 *
 * @return array
 *   An array describing the formatter types implemented by the module.
 *   The keys are formatter type names. To avoid name clashes, formatter type
 *   names should be prefixed with the name of the module that exposes them.
 *   The values are arrays describing the formatter type, with the following
 *   key/value pairs:
 *   - label: The human-readable name of the formatter type.
 *   - description: A short description for the formatter type.
 *   - extra field types: An array of extra field types the formatter supports.
 *   - settings: An array whose keys are the names of the settings available
 *     for the formatter type, and whose values are the default values for
 *     those settings.
 *
 * @see hook_field_extra_fields_formatter_info_alter()
 * @see hook_field_extra_fields_formatter_view()
 */
function hook_field_extra_fields_formatter_info() {
  return [
    'date' => [
      'label' => t('Date'),
      'description' => t('Format extra field as date.'),
      'extra field types' => ['date'],
      'settings' => ['format' => 'medium'],
    ],
  ];
}

/**
 * Perform alterations on Extra Field formatter types.
 *
 * @param array &$info
 *   An array of information on formatter types exposed by
 *   hook_field_extra_fields_formatter_info() implementations.
 */
function hook_field_extra_fields_formatter_info_alter(&$info) {
  // Add a setting to a formatter type.
  $info['date']['settings'] += array(
    'mymodule_additional_setting' => 'default value',
  );

  // Let a new field type re-use an existing formatter.
  $info['date']['extra field types'][] = 'my_extra_field_type';
}

/**
 * Specify the form elements for a formatter's settings.
 *
 * This hook is only invoked if hook_field_formatter_settings_summary()
 * returns a non-empty value.
 *
 * @param string $extra_field_name
 *   The extra field name.
 * @param string $view_mode
 *   The view mode being configured.
 * @param array $display
 *   The display settings to use, as found in the 'display' entry of instance
 *   definitions. The array notably contains the following keys and values;
 *   - type: The name of the formatter to use.
 *   - settings: The array of formatter settings.
 * @param array $form
 *   The (entire) configuration form array, which will usually have no use here.
 * @param array &$form_state
 *   The form state of the (entire) configuration form.
 *
 * @return array
 *   The form elements for the formatter settings.
 */
function hook_field_extra_fields_formatter_settings_form($extra_field_name, $view_mode, $display, $form, &$form_state) {
  $settings = $display['settings'];
  $element = [];
  switch ($display['type']) {
    case 'date':
      $format_types = _extra_field_formatter_get_system_dates();
      $element['format'] = [
        '#type' => 'select',
        '#options' => $format_types,
        '#default_value' => $settings['format'],
        '#required' => TRUE,
      ];
      break;
  }
  return $element;
}

/**
 * Return a short summary for the current formatter settings of an instance.
 *
 * If an empty result is returned, the formatter is assumed to have no
 * configurable settings, and no UI will be provided to display a settings
 * form.
 *
 * @param string $extra_field_name
 *   The extra field name.
 * @param string $view_mode
 *   The view mode for which a settings summary is requested.
 * @param array $display
 *   The display settings to use, as found in the 'display' entry of instance
 *   definitions. The array notably contains the following keys and values;
 *   - type: The name of the formatter to use.
 *   - settings: The array of formatter settings.
 *
 * @return string
 *   A string containing a short summary of the formatter settings.
 */
function hook_field_extra_fields_formatter_settings_summary($extra_field_name, $view_mode, $display) {
  $settings = $display['settings'];
  switch ($display['type']) {
    case 'date':
      return t('Display dates using the @format format', array('@format' => $settings['format']));
  }
}

/**
 * Build a renderable array for a field value.
 *
 * @param string $entity_type
 *   The type of $entity.
 * @param object $entity
 *   The entity being displayed.
 * @param string $extra_field_name
 *   The extra field name.
 * @param string $langcode
 *   The language associated with $items.
 * @param array $items
 *   Array of values for this field.
 * @param array $display
 *   The display settings to use, as found in the 'display' entry of instance
 *   definitions. The array notably contains the following keys and values;
 *   - type: The name of the formatter to use.
 *   - settings: The array of formatter settings.
 *
 * @return array
 *   A renderable array for the $items, as an array of child elements keyed
 *   by numeric indexes starting from 0.
 */
function hook_field_extra_fields_formatter_view($entity_type, $entity, $extra_field_name, $langcode, $items, $display) {
  $element = [];
  $settings = $display['settings'];
  switch ($display['type']) {
    case 'date':
      foreach ($items as $delta => $item) {
        $element[$delta] = array('#markup' => format_date($item, $settings['format']));
      }
      break;
  }
  return $element;
}
