/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import { Behaviour, Form as AlloyForm, Keying, Memento, SimpleSpec } from '@ephox/alloy';
import { console } from '@ephox/dom-globals';
import { Arr, Fun } from '@ephox/katamari';

import { ComposingConfigs } from '../alien/ComposingConfigs';
import { RepresentingConfigs } from '../alien/RepresentingConfigs';
import * as FormValues from '../general/FormValues';
import NavigableObject from '../general/NavigableObject';
import { interpretInForm } from '../general/UiFactory';
import { UiFactoryBackstage } from '../../backstage/Backstage';

export interface BodyPanelFoo<I> {
  items: I[];
}

const renderBodyPanel = <I>(spec: BodyPanelFoo<I>, backstage: UiFactoryBackstage): SimpleSpec => {
  const memForm = Memento.record(
    AlloyForm.sketch(function (parts) {
      return {
        dom: {
          tag: 'div',
          classes: [ 'tox-dialog__body-content' ]
        },
        // All of the items passed through the form need to be put through the interpreter
        // with their form part preserved.
        components: Arr.map(spec.items, (item) => {
          return interpretInForm(parts, item, backstage);
        })
      };
    })
  );

  return {
    dom: {
      tag: 'div',
      classes: [ 'tox-dialog__body' ]
    },
    components: [
      memForm.asSpec()
    ],
    behaviours: Behaviour.derive([
      Keying.config({
        mode: 'acyclic',
        useTabstopAt: Fun.not(NavigableObject.isPseudoStop)
      }),
      ComposingConfigs.memento(memForm),
      RepresentingConfigs.memento(memForm, {
        postprocess: (formValue) => FormValues.toValidValues(formValue).fold(
          (err) => {
            console.error(err);
            return { };
          },
          (vals) => vals
        )
      })
    ])
  };
};

export {
  renderBodyPanel
};