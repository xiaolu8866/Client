import { getStoreState } from '@redux/configureStore/helper';
import _get from 'lodash/get';

/**
 * 获取当前选择的团角色的角色信息
 */
export function getCurrentGroupActor(groupUUID: string) {
  const state = getStoreState();

  const groupInfo = state.group.groups.find(
    (group) => group.uuid === groupUUID
  );
  const selfActors: string[] = state.actor.selfActors.map((i) => i.uuid);
  const selfGroupActors = (groupInfo.group_actors ?? []).filter(
    (i) => i.enabled && selfActors.includes(i.actor_uuid)
  );
  const selectedGroupActorUUID = _get(groupInfo, [
    'extra',
    'selected_group_actor_uuid',
  ]);
  const currentGroupActorInfo = selfGroupActors.find(
    (actor) => actor.uuid === selectedGroupActorUUID
  );
  return currentGroupActorInfo;
}