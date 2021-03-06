import { TMemo } from '@shared/components/TMemo';
import { useCachedUserInfo } from '@shared/hooks/useCache';
import { getUserName } from '@shared/utils/data-helper';
import React, { useCallback } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import _isFunction from 'lodash/isFunction';
import { UserAvatar } from './UserAvatar';
import { SpaceFull } from './SpaceFull';

export const UserItemContainer = styled.TouchableOpacity`
  padding: 10px 10px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: ${(props) => props.theme.color.borderBase};
  background-color: white;
`;

type UserItemActionCallback = (uuid: string, name: string) => void;

export const UserItem: React.FC<{
  uuid: string;
  onPress?: UserItemActionCallback;
  onLongPress?: UserItemActionCallback;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}> = TMemo((props) => {
  const { uuid, onPress, onLongPress, prefix, suffix } = props;

  const userInfo = useCachedUserInfo(uuid);
  const name = getUserName(userInfo);
  const avatar = userInfo.avatar;

  const handlePress = useCallback(() => {
    _isFunction(onPress) && onPress(uuid, name);
  }, [uuid, name, onPress]);

  const handleLongPress = useCallback(() => {
    _isFunction(onLongPress) && onLongPress(uuid, name);
  }, [uuid, name, onLongPress]);

  return (
    <UserItemContainer onPress={handlePress} onLongPress={handleLongPress}>
      {prefix}
      <UserAvatar name={name} uri={avatar} />
      <Text>{name}</Text>
      <SpaceFull />
      {suffix}
    </UserItemContainer>
  );
});
UserItem.displayName = 'UserItem';
