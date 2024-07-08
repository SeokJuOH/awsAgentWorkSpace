export type AgentChannelConcurrency = Record<string, number>;

export type AgentRoutingProfile = {
    channelConcurrencyMap: AgentChannelConcurrency;
    defaultOutboundQueue: Queue;
    name: string;
    queues: Queue[];
    routingProfileARN: string;
    routingProfileId: string;
  };
  
export type Queue = {
    name: string;
    queueARN: string;
    queueId: string;
};

export type AgentChannelConcurrencyMap = {
  AgentChannelConcurrency : Record<string, number>;
}