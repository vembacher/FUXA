import { Utils } from "../_helpers/utils";

export class Device {
    /** Device id, GUID */
    id: string;
    /** Device name */
    name: string;
    /** Enabled */
    enabled: boolean;
    /** Connection property, DeviceNetProperty */
    property: any;
    /** Device type, OPC, Modbus, S7, etc. */
    type: DeviceType;
    /** Polling interval, check changed value after ask value, by OPCUA there is a monitor  */
    polling: number;
    /** Tags list of Tag */
    tags: any;

    constructor(_id: string) {
        this.id = _id;
    }

    static descriptor = {
        id: 'Device id, GUID',
        name: 'Device name',
        enabled: 'Enabled',
        type: 'Device Type: FuxaServer | SiemensS7 | OPCUA | BACnet | ModbusRTU | ModbusTCP | WebAPI | MQTTclient | internal | EthernetIP',
        polling: 'Polling interval in millisec., check changed value after ask value, by OPCUA there is a monitor',
        property: 'Connection property depending of type',
        tags: 'Tags list of Tag',
    };
}

export class Tag {
    /** Tag id, GUID */
    id: string;
    /** Tag name, is like the id  */
    name: string;
    /** Tag label, used by BACnet and WebAPI  */
    label: string;
    /** not used yet */
    value: string;
    /** Tag type, Bool, Byte, etc. */
    type: string;
    /** Address of Tag, combine with address by Modbus, some property for WebAPI */
    memaddress: string;
    /** Tag address, for OPCUA like the id */
    address: string;
    /** Value divisor, used by Modbus */
    divisor: number;
    /** not used yet */
    access: string;
    /** Options, used for WebAPI and MQTT */
    options: any;
    /** not used yet */
    format: any;
    /** Daq settings */
    daq: TagDaq;
    /** Init value */
    init: string;

    constructor(_id: string) {
        this.id = _id;
        this.daq = new TagDaq(false, true, 60);
    }

    static descriptor = {
        id: 'Tag id, GUID',
        name: 'Tag name, is like the id',
        label: 'Tag label, used by BACnet and WebAPI',
        type: 'Tag type, Bool, Byte, etc. depending of device type',
        memaddress: 'Address of Tag, combine with address by Modbus, some property for WebAPI',
        address: 'Tag address, for OPCUA like the id',
        divisor: 'Value divisor, used by Modbus',
        options: 'Options is a string JSON object, used for WebAPI and MQTT, pubs: items to publish | subs: items to subscribe',
        init: 'Init value',
        daq: { 
            enabled: 'Daq enabled storage', 
            interval: 'min storage interval (without change value)' 
        },
    }
}

export class TagDaq {
    /** DAQ data acquisition is enabled */
    enabled: boolean;
    /** Fix interval to save the current value in seconds*/
    interval: number;
    /** Save if the value was changed, the check is in device polling interval */
    changed: boolean;
    
    constructor(_enabled: boolean, _changed: boolean, _interval: number) {
        this.enabled = _enabled;
        this.changed = _changed;
        this.interval = _interval;
    }
}

export class DeviceNetProperty {
    /** Device address (IP) */
    address: string;
    /** Address port */
    port: string;
    /** Slot number used for Siemens S7 connection */
    slot: string;
    /** Rack number used for Siemens S7 connection */
    rack: string;
    /** Slave ID used for Modbus connection */
    slaveid: string;
    /** Serial baudrate used for Modbus RTU connection */
    baudrate: string;
    /** Serial databits used for Modbus RTU connection */
    databits: string;
    /** Serial stopbits used for Modbus RTU connection */
    stopbits: string;
    /** Serial parity used for Modbus RTU connection */
    parity: string;
    /** Options settings used for Modbus tockenized frame */
    options: string;
    /** Method flag used for WebAPI (GET/POST) */
    method: string;
    /** Data format flag used for WebAPI (CSV/JSON) */
    format: string;

    static descriptor = {
        address: 'Device address (IP)',
        // port: 'Address port',
        // slot: 'Slot number used for Siemens S7 connection',
        // rack: 'Rack number used for Siemens S7 connection',
        // slaveid: 'Slave ID used for Modbus connection',
        // baudrate: 'Serial baudrate used for Modbus RTU connection',
        // databits: 'Serial databits used for Modbus RTU connection',
        // stopbits: 'Serial stopbits used for Modbus RTU connection',
        // parity: 'Serial parity used for Modbus RTU connection',
        // options: 'Options settings used for Modbus tockenized frame if "true" frames without unassigned address. In EthernetIP routing rack/slot',
        // method: 'Method flag used for WebAPI (GET/POST)',
        // format: 'Data format flag used for WebAPI (CSV/JSON)',
    }
}

export class DeviceSecurity {
    mode: any;
    username: string;
    password: string;
    clientId: string;
    grant_type: string;
}

export enum DeviceType {
    FuxaServer = 'FuxaServer',
    SiemensS7 = 'SiemensS7',
    OPCUA = 'OPCUA',
    BACnet = 'BACnet',
    ModbusRTU = 'ModbusRTU',
    ModbusTCP = 'ModbusTCP',
    WebAPI = 'WebAPI',
    MQTTclient = 'MQTTclient',
    WebStudio = 'WebStudio',
    internal = 'internal',
    EthernetIP = 'EthernetIP'
    // Template: 'template'
}

export enum TagType {
    Bool = 'Bool',
    Byte = 'Byte',
    Int = 'Int',
    Word = 'Word',
    DInt = 'DInt',
    DWord = 'DWord',
    Real = 'Real'
}

export enum ModbusTagType {
    Bool = 'Bool',
    Int16 = 'Int16',
    UInt16 = 'UInt16',
    Int32 = 'Int32',
    UInt32 = 'UInt32',
    Float32 = 'Float32',
    Float64 = 'Float64',
    Int16LE = 'Int16LE',
    UInt16LE = 'UInt16LE',
    Int32LE = 'Int32LE',
    UInt32LE = 'UInt32LE',
    Float32LE = 'Float32LE',
    Float64LE = 'Float64LE',
    Float32MLE = 'Float32MLE'
    // String = 'String'
}

export enum MessageSecurityMode {
    /** The MessageSecurityMode is invalid */
    INVALID,
    /** No security is applied. */
    NONE = '1', //'NONE',
    /** All messages are signed but not encrypted. */
    SIGN = '2', //'SIGN',
    /** All messages are signed and encrypted. */
    SIGNANDENCRYPT = '3'    //'SIGNANDENCRYPT'
}

export enum SecurityPolicy {
    /** see http://opcfoundation.org/UA/SecurityPolicy#None */
    None = 'None',
    /** see http://opcfoundation.org/UA/SecurityPolicy#Basic128 */
    Basic128 = 'Basic128',
    /** see http://opcfoundation.org/UA/SecurityPolicy#Basic128Rsa15 */
    Basic128Rsa15 = 'Basic128Rsa15',
    /** see http://opcfoundation.org/UA/SecurityPolicy#Basic192 */
    Basic192 = 'Basic192',
    /** see http://opcfoundation.org/UA/SecurityPolicy#Basic192Rsa15 */
    Basic192Rsa15 = 'Basic192Rsa15',
    /** see http://opcfoundation.org/UA/SecurityPolicy#Basic256 */
    Basic256 = 'Basic256',
    /** see http://opcfoundation.org/UA/SecurityPolicy#Basic256Rsa15 */
    Basic256Rsa15 = 'Basic256Rsa15',
    /** see http://opcfoundation.org/UA/SecurityPolicy#Basic256Sha25 */
    Basic256Sha256 = 'Basic256Sha256',
    /** see 'http://opcfoundation.org/UA/SecurityPolicy#Aes256_Sha256_RsaPss' */
    Aes256_Sha256_RsaPss = 'Aes256_Sha256_RsaPss',
    /** see ''http://opcfoundation.org/UA/SecurityPolicy#Aes128_Sha256_RsaOaep'' */
    Aes128_Sha256_RsaOaep = 'Aes128_Sha256_RsaOaep'
}

export enum BACnetObjectType {
    ANALOG_INPUT = 'Analog Input',              // 0
    ANALOG_OUTPUT = 'Analog Output',            // 1
    ANALOG_VALUE = 'Analog Value',              // 2
    BINARY_INPUT = 'Binary Input',              // 3
    BINARY_OUTPUT = 'Binary Output',            // 4
    BINARY_VALUE = 'Binary Value',              // 5
    CALENDAR = '',                              // 6
    COMMAND = '',                               // 7
    DEVICE = ''                                 // 8
}

export const DEVICE_PREFIX = 'd_';
export const TAG_PREFIX = 't_';

export class DevicesUtils {
    static getDeviceTagText (devices: Device[], id: string): string {
        for (let i = 0; i < devices.length; i++) {
            if (devices[i].tags[id]) {
                return `${devices[i].name} - ${devices[i].tags[id].name}`;
            }
        }
        return '';
    }

    static getDeviceFromTagId (devices: Device[], id: string): Device {
        for (let i = 0; i < devices.length; i++) {
            if (devices[i].tags[id]) {
                return devices[i];
            }
        }
        return null;
    }

    static getTagFromTagId (devices: Device[], id: string): Tag {
        for (let i = 0; i < devices.length; i++) {
            if (devices[i].tags[id]) {
                return devices[i].tags[id];
            }
        }
        return null;
    }

    static getTagFromTagAddress (device: Device, address: string): Tag {
        return <Tag>Object.values(device.tags).find((tag: Tag) => tag.address === address);
    }

    //#region Converter
    static readonly columnDelimiter = ',';
    static readonly lineDelimiter = '\n';
    static readonly lineComment = '#';
    static readonly lineDevice = 'D@';
    static readonly lineTag = 'T@';
    static readonly lineSectionHeader = '@';
    static readonly columnMaske = '~';

    /**
     * converter of devices array to CSV format
     * @param devices 
     * @returns 
     */
    static devicesToCsv(devices: Device[]): string {
        let result = '';        
        // devices list
        let devicesHeaderDescription = `!! CSV separator property convertion to "~"${DevicesUtils.lineDelimiter}`;
        let devicesHeader = `${DevicesUtils.lineSectionHeader}header${DevicesUtils.columnDelimiter}`;
        let devicesData = '';
        const dkeys = Object.keys(Device.descriptor).filter(k => k !== 'tags');
        const pkeys = Object.keys(DeviceNetProperty.descriptor);
        dkeys.forEach(hk => {
            if (hk !== 'property') {
                devicesHeaderDescription += `${DevicesUtils.lineComment}${hk}${DevicesUtils.columnDelimiter}: ${Device.descriptor[hk]}${DevicesUtils.lineDelimiter}`;
                devicesHeader += `${hk}${DevicesUtils.columnDelimiter}`;
            }
        });
        pkeys.forEach(pk => {
            devicesHeaderDescription += `${DevicesUtils.lineComment}property.${pk}${DevicesUtils.columnDelimiter}: ${DeviceNetProperty.descriptor[pk]}${DevicesUtils.lineDelimiter}`;
            devicesHeader += `property.${pk}${DevicesUtils.columnDelimiter}`;
        });
        // device data
        for (let i = 0; i < devices.length; i++) {
            devicesData += DevicesUtils.device2Line(devices[i], dkeys, pkeys);
            devicesData += `${DevicesUtils.lineDelimiter}`;
        }
        result += `${devicesHeaderDescription}${DevicesUtils.lineDelimiter}`;
        result += `${devicesHeader}${DevicesUtils.lineDelimiter}${devicesData}`;
        result += `${DevicesUtils.lineDelimiter}`;

        // tags of devices
        let tagsHeaderDescription = '';
        let tagsHeader = '';
        let tagsData = '';
        const tkeys = Object.keys(Tag.descriptor).filter(k => k !== 'daq' && k !== 'options');
        tagsHeaderDescription += `${DevicesUtils.lineComment}deviceId${DevicesUtils.columnDelimiter}:Reference to device${DevicesUtils.lineDelimiter}`;
        tagsHeader += `${DevicesUtils.lineSectionHeader}header${DevicesUtils.columnDelimiter}deviceId${DevicesUtils.columnDelimiter}`;
        tkeys.forEach(tk => {
            tagsHeaderDescription += `${DevicesUtils.lineComment}${tk}${DevicesUtils.columnDelimiter}: ${Tag.descriptor[tk]}${DevicesUtils.lineDelimiter}`;
            tagsHeader += `${tk}${DevicesUtils.columnDelimiter}`;
        });
        tagsHeaderDescription += `${DevicesUtils.lineComment}options${DevicesUtils.columnDelimiter}: ${Tag.descriptor.options}${DevicesUtils.lineDelimiter}`;
        tagsHeader += `options${DevicesUtils.columnDelimiter}`;
        tagsHeaderDescription += `${DevicesUtils.lineComment}daq.enabled${DevicesUtils.columnDelimiter}: ${Tag.descriptor.daq.enabled}${DevicesUtils.lineDelimiter}`;
        tagsHeader += `daq.enabled${DevicesUtils.columnDelimiter}`;
        tagsHeaderDescription += `${DevicesUtils.lineComment}daq.interval${DevicesUtils.columnDelimiter}: ${Tag.descriptor.daq.interval}${DevicesUtils.lineDelimiter}`;
        tagsHeader += `daq.interval${DevicesUtils.columnDelimiter}`;

        for (let i = 0; i < devices.length; i++) {
            if (devices[i].tags) {
                const tags = <Tag[]>Object.values(devices[i].tags);
                for (let y = 0; y < tags.length; y++) {
                    tagsData += DevicesUtils.tag2Line(tags[y], devices[i].id, tkeys);
                    tagsData += `${DevicesUtils.lineDelimiter}`;
                }
            }
            tagsData += `${DevicesUtils.lineDelimiter}`;
        }
        result += `${tagsHeaderDescription}${DevicesUtils.lineDelimiter}`;
        result += `${tagsHeader}${DevicesUtils.lineDelimiter}${tagsData}`;
        result += `${DevicesUtils.lineDelimiter}`;        
        return result;
    }

    /**
     * convert string source of CSV to Device array
     * @param source 
     */
    static csvToDevices(source: string): Device[] {
        try {
            // Device keys length to check, without tags and DeviceNetProperty instead of property
            const deviceKeyLength = Object.keys(Device.descriptor).length + Object.keys(DeviceNetProperty.descriptor).length;
            // Tags keys length to check, with daq splitted in enabled and interval
            const tagKeyLength = Object.keys(Tag.descriptor).length + 4;
            let devices = {};
            const lines = source.split(DevicesUtils.lineDelimiter).filter(line => !line.startsWith(DevicesUtils.lineComment) && !line.startsWith(DevicesUtils.lineSectionHeader));
            lines.forEach((line) => {
                if (line.startsWith(DevicesUtils.lineDevice)) {
                    // Device
                    let device = DevicesUtils.line2Device(line, deviceKeyLength);
                    devices[device.id] = device;
                } else if (line.startsWith(DevicesUtils.lineTag)) {
                    // Tag
                    let result = DevicesUtils.line2Tag(line, tagKeyLength);                    
                    if (!devices[result.deviceId]) {
                        throw new Error(`Device don't exist: ${line}`);
                    }
                    if (devices[result.deviceId].tags[result.tag.id]) {
                        throw new Error(`Tag already exist: ${line}`);
                    }
                    devices[result.deviceId].tags[result.tag.id] = result.tag;
                }
            });
            return Object.values(devices);
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    static device2Line(device: Device, dkeys: string[], pkeys: string[]): string {
        let result = `${DevicesUtils.lineDevice}${DevicesUtils.columnDelimiter}`;
        dkeys.forEach(dk => {
            if (dk !== 'property') {
                let text = (device[dk]) ? device[dk].toString() : '' || '';
                result += `${text.replace(new RegExp(DevicesUtils.columnDelimiter, 'g'), DevicesUtils.columnMaske)}${DevicesUtils.columnDelimiter}`;
            }
        });
        if (device.property) {
            pkeys.forEach(pk => {
                result += `${device.property[pk] || ''}${DevicesUtils.columnDelimiter}`;
            });
        }
        return result;
    }

    static line2Device(line: string, deviceKeyLength: number): Device {
        const items = line.split(DevicesUtils.columnDelimiter);
        if (items.length < deviceKeyLength - 1) {
            throw new Error(`Format Error ${items.length}/${deviceKeyLength} ${line}`);
        }
        let device = new Device(items[1]);
        device.name = items[2].replace(new RegExp(DevicesUtils.columnMaske, 'g'), DevicesUtils.columnDelimiter);
        device.enabled = items[3].toLowerCase() === 'true' ? true : false;
        device.type = <DeviceType>items[4];
        device.polling = parseInt(items[5]) || 1000, 
        device.property = <DeviceNetProperty> { 
            address: items[6], 
            port: items[7],
            slot: items[8],
            rack: items[9],
            slaveid: items[10],
            baudrate: items[11],
            databits: items[12],
            stopbits: items[13],
            parity: items[14],
            options: items[15],
            method: items[16],
            format: items[17]
        }
        device.tags = {};
        return device;
    }

    static tag2Line(tag: Tag, deviceId: string, tkeys: string[]): string {
        let result = `${DevicesUtils.lineTag}${DevicesUtils.columnDelimiter}${deviceId}${DevicesUtils.columnDelimiter}`;
        tkeys.forEach(tk => {
            let text = tag[tk] || '';
            result += `${text.toString().replace(new RegExp(DevicesUtils.columnDelimiter, 'g'), DevicesUtils.columnMaske)}${DevicesUtils.columnDelimiter}`;
        });
        let options = (tag.options) ? JSON.stringify(tag.options) : '';
        result += `${options.replace(new RegExp(DevicesUtils.columnDelimiter, 'g'), DevicesUtils.columnMaske)}${DevicesUtils.columnDelimiter}`;
        result += `${(tag.daq) ? tag.daq.enabled : ''}${DevicesUtils.columnDelimiter}`;
        result += `${(tag.daq) ? tag.daq.interval : ''}${DevicesUtils.columnDelimiter}`;
        return result;
    }

    static line2Tag(line: string, tagKeyLength: number): { tag: Tag, deviceId: string } {
        const items = line.split(DevicesUtils.columnDelimiter);
        if (items.length < tagKeyLength - 1) {
            throw new Error(`Format Error: ${items.length}/${tagKeyLength} ${line}`);
        }
        const deviceId = items[1];
        let tag = new Tag(items[2]);
        tag.name = items[3].replace(new RegExp(DevicesUtils.columnMaske, 'g'), DevicesUtils.columnDelimiter);
        tag.label = items[4].replace(new RegExp(DevicesUtils.columnMaske, 'g'), DevicesUtils.columnDelimiter);
        tag.type = items[5];
        tag.memaddress = items[6].replace(new RegExp(DevicesUtils.columnMaske, 'g'), DevicesUtils.columnDelimiter);
        tag.address = items[7].replace(new RegExp(DevicesUtils.columnMaske, 'g'), DevicesUtils.columnDelimiter);
        tag.divisor = parseInt(items[8]) || 1;
        tag.options = items[9].replace(new RegExp(DevicesUtils.columnMaske, 'g'), DevicesUtils.columnDelimiter);
        if (tag.options && Utils.isJson(tag.options)) {
            tag.options = JSON.parse(tag.options);
        }
        tag.init = items[10];
        tag.daq = <TagDaq> {
            enabled: items[11] === 'true' ? true : false,
            changed: true,
            interval: parseInt(items[12]) || 60
        }
        return { tag, deviceId };
    }
    //#endregion
}


export enum DeviceViewModeType {
    tags = 'tags',
    devices = 'devices',
    list = 'devices-list',
    map = 'devices-map',
}

export enum DeviceConnectionStatusType {
    ok = 'device.connect-ok',
    error = 'device.connect-error',
    failed = 'device.connect-failed',
    off = 'device.connect-off',
    busy = 'device.connect-busy',
}

export enum ServerTagType {
    number = 'number',
    boolean = 'boolean',
    string = 'string'
}