import { ChatLogItem } from '@shared/model/chat';
import { hpack } from '@shared/utils/json-helper';
import { request } from '@shared/utils/request';

export interface GameReport {
  uuid: string;
  title: string;
  cast: any;
  groupUUID: string;
  content: {
    playerUUID: string;
    logs: ReportLogItem[];
  };
}

// 消息log必须的字段
// 用于消息数据压缩
export const reportLogRequireKey = [
  'uuid',
  'sender_uuid',
  'message',
  'type',
  'date',
  'data',
  'revoke',
] as const;

export type ReportLogItem = Pick<
  ChatLogItem,
  typeof reportLogRequireKey[number]
>;
export interface EditLogItem extends ReportLogItem {
  selected: boolean;
}
export interface DetailLogItem extends ReportLogItem {
  isShow: boolean;
}

/**
 * 创建游戏战报
 * @param title 标题
 * @param playerUUID 战报主视角的UUID
 * @param groupUUID 战报选择团的UUID
 * @param logs 记录
 */
export const createTRPGGameReport = async (
  title: string,
  playerUUID: string,
  groupUUID: string,
  logs: ReportLogItem[]
): Promise<string> => {
  const { data } = await request.post('/trpg/game-report/create', {
    title,
    groupUUID,
    content: { playerUUID, logs: hpack(logs) },
  });

  return data.uuid;
};

/**
 * 获取团战报列表
 * @param groupUUID 团UUID
 */
export async function fetchGroupReport(
  groupUUID: string
): Promise<GameReport[]> {
  const { data } = await request.get(
    `/trpg/game-report/group/${groupUUID}/list`
  );

  return data.list;
}
