export enum ECallDirection {
  INBOUND = "inbound",
  OUTBOUND = "outbound"
}
export enum ECallType {
  ANSWERED = "answered",
  MISSED = "missed",
  VOICEMAIL = "voicemail"
}

export type TCall = {
  "direction": TCallDirection,
  "from": number,
  "to": number,
  "via": number,
  "duration": number,
  "is_archived": boolean,
  "call_type": TCallType,
  "id": string,
  "created_at": string
}
export type TCallDirection = ECallDirection;
export type TCallType = ECallType;