import { Inner as VerifiedInner } from "#/components/verification/VerificationsDialog";
import { Inner as VerifierInner } from "#/components/verification/VerifierDialog";
import { OCbwoy3DiscordStatus } from "#/ocbwoy3BskyHack/components/DiscordStatus";
import { View } from "react-native";
import { InterestsInnerWhatever } from "../InterestsSettings";
import { TrendingTopicSkeleton } from "#/components/TrendingTopics";
import { SidebarTrendingTopics } from "#/view/shell/desktop/SidebarTrendingTopics";

const wtf = {
    verificationState: {
        viewer: {
            role: "default" as "default",
            isVerified: false,
            hasIssuedVerification: false,
        },
        profile: {
            isVerified: true,
            isViewer: false,
            role: "default" as "default",
            showBadge: true,
            wasVerified: true
        }
    },
    profile: {
        did: 'did:plc:s7cesz7cr6ybltaryy4meb6y',
        displayName: 'OCbwoy3',
        handle: 'ocbwoy3.dev',
        verification: {
            verifications: [
                {
                    issuer: "did:plc:z72i7hdynmk6r22z27h6tvur",
                    uri: "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.graph.verification/3lndppjqgb72f",
                    isValid: true,
                    createdAt: "2025-04-21T10:44:20.398Z"
                }
            ],
            verifiedStatus: "valid",
            trustedVerifierStatus: "none"
        }
    },
    control: { ref: undefined as any, id: "idk", isOpen: true, open: () => { }, close: () => { } }
}

export function WTF() {

    return <View style={[{
        gap: 16
    }]}>
        <OCbwoy3DiscordStatus
            allowedApplicationIds={['886578863147192350']}
            disallowNullApps
        />
        <VerifiedInner {...wtf} />
        <VerifierInner {...wtf} profile={{
            did: 'did:plc:z72i7hdynmk6r22z27h6tvur',
            displayName: 'Bluesky',
            handle: 'bsky.app',
            verification: {
                verifications: [],
                verifiedStatus: "valid",
                trustedVerifierStatus: "none"
            }
        }} />
        <SidebarTrendingTopics/>
    </View>
}