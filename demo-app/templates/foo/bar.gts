import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { pageTitle } from 'ember-page-title';
import { breadcrumb } from '#src/index.ts';

export default class FooBar extends Component {
  @tracked number = randomNumber();

  @action
  getRandomNumber() {
    this.number = randomNumber();
  }
  <template>
    {{pageTitle "Bar"}}
    {{! @glint-expect-error: TODO fix types}}
    {{breadcrumb "Bar: " this.number route="foo.bar"}}
    {{outlet}}

    <button type="button" {{on "click" this.getRandomNumber}}>Random</button>
  </template>
}

function randomNumber() {
  return Math.round(Math.random() * 100) + 1;
}
