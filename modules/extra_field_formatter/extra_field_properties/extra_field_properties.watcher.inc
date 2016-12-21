<?php
/**
 * Class using destructor hack as an event for drupal_static_reset().
 */
class ExtraFieldPropertiesDrupalStaticResetWatcher {
  protected $callback;

  /**
   * Constructor.
   *
   * @param mixed $callback
   *   The callback to invoke during desctruction.
   */
  public function __construct($callback) {
    $this->callback = $callback;
  }

  /**
   * Destructor.
   *
   * Invoke callback.
   */
  public function __destruct() {
    // Ensure that we don't fire the callback if we're shut down by php exit clean up.
    $debug = debug_backtrace(DEBUG_BACKTRACE_PROVIDE_OBJECT | DEBUG_BACKTRACE_IGNORE_ARGS);
    if (count($debug) > 1) {
      call_user_func($this->callback);
    }
  }

}
