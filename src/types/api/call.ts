export type TCall = {
  "direction": TCallDirection,
  "from": number,
  "to": number,
  "via": number,
  "duration": number,
  "is_archived": boolean,
  "call_type": TCallType,
  "id": string,
  "created_at": Date
}
type TCallDirection = "inbound" | "outbound";
type TCallType = "answered" | "missed" | "voicemail";