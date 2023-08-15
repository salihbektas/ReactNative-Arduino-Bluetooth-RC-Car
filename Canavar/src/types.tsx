import type {NativeStackScreenProps} from '@react-navigation/native-stack'

export type RootStackParamList = {
  Scan: undefined
  Controller: {deviceName: string}
}

export type ScanProps = NativeStackScreenProps<RootStackParamList, 'Scan'>
export type ControllerProps = NativeStackScreenProps<RootStackParamList, 'Controller'>
