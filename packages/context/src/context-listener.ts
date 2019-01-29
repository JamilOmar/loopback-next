// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/context
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Binding} from './binding';
import {BindingFilter} from './binding-filter';
import {ValueOrPromise} from './value-promise';
import {Context} from './context';

/**
 * Context event types. We support `bind` and `unbind` for now but
 * keep it open for new types
 */
export type ContextEventType = 'bind' | 'unbind' | string;

/**
 * Listeners of context bind/unbind events
 */
export interface ContextEventListener {
  /**
   * An optional filter function to match bindings. If not present, the listener
   * will be notified of all binding events.
   */
  filter?: BindingFilter;

  /**
   * Listen on `bind`, `unbind`, or other events
   * @param eventType Context event type
   * @param binding The binding as event source
   */
  listen(
    eventType: ContextEventType,
    binding: Readonly<Binding<unknown>>,
    context: Context,
  ): ValueOrPromise<void>;
}

/**
 * Subscription of context events. It's modeled after
 * https://github.com/tc39/proposal-observable.
 */
export interface Subscription {
  /**
   * unsubscribe
   */
  unsubscribe(): void;
  /**
   * Is the subscription closed?
   */
  closed: boolean;
}
