import type { DangerDSLType } from "danger";
import _ from "lodash";

declare const fail: typeof import("danger").fail;
declare const message: typeof import("danger").message;
declare const warn: typeof import("danger").warn;

declare type ruleCheckMessageConstructor = () => string;

export interface Rule {
    check: (danger: DangerDSLType) => Promise<void>;
}

export class SanityCheckRule implements Rule {
    private readonly checkFunction: (danger: DangerDSLType) => Promise<boolean>;
    private readonly ruleCheckMessage: ruleCheckMessageConstructor;

    constructor(checkFunction: (danger: DangerDSLType) => Promise<boolean>, ruleCheckMessage: ruleCheckMessageConstructor | string) {
        this.checkFunction = checkFunction;
        this.ruleCheckMessage = typeof ruleCheckMessage === "string"
            ? () => ruleCheckMessage
            : ruleCheckMessage;
    }

    public async check(danger: DangerDSLType) {
        if (!await this.checkFunction(danger)) {
            warn(this.ruleCheckMessage());
        }
    }
}

export class RedGreenRule implements Rule {
    private readonly checkFunction: (danger: DangerDSLType) => Promise<boolean>;
    private readonly ruleCheckMessage: ruleCheckMessageConstructor;

    constructor(checkFunction: (danger: DangerDSLType) => Promise<boolean>, ruleCheckMessage: ruleCheckMessageConstructor | string) {
        this.checkFunction = checkFunction;
        this.ruleCheckMessage = typeof ruleCheckMessage === "string"
            ? () => ruleCheckMessage
            : ruleCheckMessage;
    }

    public async check(danger: DangerDSLType): Promise<void> {
        if (await this.checkFunction(danger)) {
            message(this.ruleCheckMessage(), {icon: ':heavy_check_mark:'});
        } else {
            fail(this.ruleCheckMessage());
        }
    }
}

export class MapChangeRule extends RedGreenRule {
    public async check(danger: DangerDSLType) {
        if (danger.git.fileMatch("Map/map").modified) {
            await super.check(danger);
        }
    }
}

export class SimpleFileChangeRule extends MapChangeRule {
    constructor(readableFileName: string, filePath: string) {
        const checkFunction = async (danger: DangerDSLType) =>
            danger.git.fileMatch(filePath).edited;
        super(checkFunction, `Updated ${readableFileName}.`);
    }
}

export class RoomCheckRule extends MapChangeRule {
    constructor(filteredRooms: any[], roomProperty: string, echoFoundRooms: boolean = true) {
        const checkFunction = (_danger: DangerDSLType) =>
            Promise.resolve(filteredRooms.length === 0);
        let ruleCheckMessage: string;
        if (filteredRooms.length === 0) {
            ruleCheckMessage = `No ${roomProperty}.`;
        } else if (echoFoundRooms) {
            ruleCheckMessage = `Found ${roomProperty}: ${_.map(filteredRooms, (room) => room.id).toString()}`;
        } else {
            ruleCheckMessage = `Found ${roomProperty}.`;
        }
        super(checkFunction, ruleCheckMessage);
    }
}
