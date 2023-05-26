import { buildSelector } from '@/shared/lib/store';
import { JsonSettings } from '../types/jsonSettings';

const DEFAULT_JSON_SETTINGS: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
	(state) => state.user?.authData?.jsonSettings ?? DEFAULT_JSON_SETTINGS,
);
export const [useJsonSettingsByKey, getJsonSettingsByKey] = buildSelector(
	(state, key: keyof JsonSettings) => state.user?.authData?.jsonSettings?.[key],
);
