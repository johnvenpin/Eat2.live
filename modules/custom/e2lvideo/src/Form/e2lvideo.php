<?php

namespace Drupal\e2lvideo\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class e2lvideo.
 */
class e2lvideo extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'e2lvideo.e2lvideo',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'e2lvideo';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('e2lvideo.e2lvideo');
    // $form['videotoken'] = [
    //   '#type' => 'text_field',
    //   '#title' => $this->t('videotoken'),
    //   '#description' => $this->t('Please enter your video token'),
    //   '#default_value' => $config->get('videotoken'),
    // ];
    $form['videotoken'] = [
     '#type' => 'textfield',
     '#title' => $this->t('Please enter your video token'),
     '#description' => $this->t('Video Token'),
     '#maxlength' => 64,
     '#size' => 64,
     '#default_value' => $config->get('videotoken'),
   ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('e2lvideo.e2lvideo')
      ->set('videotoken', $form_state->getValue('videotoken'))
      ->save();
  }

}
