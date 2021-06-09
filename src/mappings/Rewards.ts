import {HistoryElement} from '../types/models/HistoryElement';
import {SubstrateEvent} from "@subql/types";
import {eventId} from "./common";

export async function handleReward(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newReward]}} = event;

    const element = new HistoryElement(eventId(event));

    element.address = account.toString()
    element.timestamp = event.block.timestamp.toISOString()
    element.reward = {
        amount: newReward.toString(),
        isReward: true
    }

    await element.save();
}

export async function handleSlash(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newSlash]}} = event;

    const element = new HistoryElement(eventId(event));

    element.address = account.toString()
    element.timestamp = event.block.timestamp.toISOString()
    element.reward = {
        amount: newSlash.toString(),
        isReward: false
    }

    await element.save();
}
