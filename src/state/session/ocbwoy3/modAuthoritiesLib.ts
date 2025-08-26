// Written by OCbwoy3 (@ocbwoy3.dev) - Bluesky Mod

const forceLabelersWithOpt = `
Bluesky Moderation Service - did:plc:ar7c4by46qjdydhdevvrndac
Asuka's Anti-Transphobia Field - did:plc:4ugewi6aca52a62u62jccbl7
Skywatch Blue / Anti-Alf Aktion - did:plc:e4elbtctnfqocyfcml6h2lf7
Blacksky Moderation - did:plc:d2mkddsbmnrgr3domzg5qexf
Laelaps - did:plc:lcdcygpdeiittdmdeddxwt4w`;

export const forceLabelerDidsWithOpt = forceLabelersWithOpt
    .split('\n')
    .map(line => {
        const match = line.match(/did:plc:[a-z0-9]+/);
        return match ? match[0] : null;
    })
    .filter((did): did is string => !!did);