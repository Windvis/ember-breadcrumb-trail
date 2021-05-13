import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FooBarController extends Controller {
  @tracked number = randomNumber();

  @action
  getRandomNumber() {
    this.number = randomNumber();
  }
}

function randomNumber() {
  return Math.round(Math.random() * 100) + 1;
}
