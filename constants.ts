
import { S3Policy, ProjectDetails, VideoStep } from './types';

export const S3_BUCKET_POLICY: S3Policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudTrailBucketRead",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudtrail.amazonaws.com"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::new-demo-manipal"
            ,
            "Condition": {
                "StringEquals": {
                    "aws:SourceAccount": "7832-6476-6493"
                }
            }
        },
        {
            "Sid": "AllowCloudTrailLogDelivery",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudtrail.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::new-demo-manipal/AWSLogs/783264766493/*",
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control",
                    "aws:SourceAccount": "7832-6476-6493"
                }
            }
        },
        {
            "Sid": "AllowVPCFlowLogBucketRead",
            "Effect": "Allow",
            "Principal": {
                "Service": "delivery.logs.amazonaws.com"
            },
            "Action": "s3:GetBucketAcl",
            "Resource": "arn:aws:s3:::new-demo-manipal",
            "Condition": {
                "StringEquals": {
                    "aws:SourceAccount": "7832-6476-6493"
                }
            }
        },
        {
            "Sid": "AllowVPCFlowLogDelivery",
            "Effect": "Allow",
            "Principal": {
                "Service": "delivery.logs.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::new-demo-manipal/AWSLogs/783264766493/*",
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control",
                    "aws:SourceAccount": "7832-6476-6493"
                }
            }
        }
    ]
};

export const PROJECT_DETAILS: ProjectDetails = {
    sourceAccount: '7832-6476-6493',
    destAccount: '0885-3224-4571',
    s3BucketName: 'new-demo-manipal',
    s3BucketArn: 'arn:aws:s3:::new-demo-manipal',
};

export const VIDEO_OUTLINE: VideoStep[] = [
    {
        part: 'Intro',
        title: 'The Goal: Centralize Logs for Security',
        description: 'Understand the "why" behind the project: preventing log tampering by isolating logs in a separate, secure account.',
        details: [
            "Problem: A compromised account can lead to deleted logs.",
            "Solution: A separate 'Log Archive' (vault) and 'Development' (source) account.",
            "Showcase the two account IDs."
        ]
    },
    {
        part: 'Part 1',
        title: 'Configure the "Log Archive" Account',
        description: 'Set up the destination S3 bucket and apply the critical bucket policy, which is the key to the entire setup.',
        details: [
            "Log into the 'Log Archive' account (0885-...).",
            "Show the 'new-demo-manipal' S3 bucket.",
            "Deep dive into the 4 parts of the S3 Bucket Policy.",
            "Explain the 'Condition' clause that locks it down to the 'Development' account."
        ]
    },
    {
        part: 'Part 2',
        title: 'Configure the "Development" Account',
        description: 'Point the logging services in the source account to the newly secured S3 bucket in the archive account.',
        details: [
            "Log into the 'Development' account (7832-...).",
            "Show CloudTrail pointing to the archive bucket.",
            "Show VPC Flow Logs destination pointing to the same archive bucket ARN."
        ]
    },
    {
        part: 'Part 3',
        title: 'Verification: The Proof',
        description: 'Confirm that the cross-account logging is working by checking the S3 bucket for new log files.',
        details: [
            "Log back into the 'Log Archive' account.",
            "Navigate the S3 bucket folder structure: AWSLogs -> AccountID.",
            "Show the 'CloudTrail' and 'vpcflowlogs' folders as proof of success."
        ]
    }
];

export const README_CONTENT = `
# AWS Cross-Account Log Centralization Project

This project demonstrates a core AWS security best practice: centralizing logs from a "Development" account into a separate, secure "Log Archive" account.

* **"Development" Account (Source):** \`7832-6476-6493\`
* **"Log Archive" Account (Destination):** \`0885-3224-4571\`
* **S3 Bucket:** \`new-demo-manipal\` (in \`ap-south-1\` region)

## 🎯 The Goal

The primary goal is to ensure that all logs (CloudTrail and VPC Flow Logs) are sent to a secure, isolated S3 bucket. This prevents a potential attacker who compromises the "Development" account from deleting the logs and covering their tracks.

## Phase 1: Configure the "Log Archive" Account (The Vault)

1.  **Created a new AWS Account** (\`0885-3224-4571\`) using AWS Organizations to avoid needing a new credit card.
2.  **Created an S3 Bucket** (\`new-demo-manipal\`) in the \`ap-south-1\` (Mumbai) region.
3.  **Applied a strict S3 Bucket Policy** to this bucket. This policy is the key to the entire project. It contains four statements to grant \`s3:GetBucketAcl\` (to check permissions) and \`s3:PutObject\` (to deliver logs) to *both* the CloudTrail and VPC Flow Log services.
4.  Crucially, all permissions are restricted by a **Condition** that only allows actions originating from our "Development" account (\`7832-6476-6493\`).

## Phase 2: Configure the "Development" Account (The Source)

1.  **Configured CloudTrail:** I created a new trail (\`trail-manipal\`) and set its storage location to point to the \`new-demo-manipal\` bucket in the Log Archive account.
2.  **Configured VPC Flow Logs:** I selected the default VPC (\`vpc-0aa8b2087d0c827ee\`) and created a new flow log. I set its destination to also point to the \`new-demo-manipal\` bucket using its ARN (\`arn:aws:s3:::new-demo-manipal\`).

## Phase 3: Verification (The Proof)

After waiting 10-15 minutes, I verified the setup by logging back into the "Log Archive" account.

Inside the \`new-demo-manipal\` S3 bucket, the following folder structure was automatically created, proving that *both* services are successfully delivering logs from the Development account:

\`\`\`
new-demo-manipal/
└── AWSLogs/
    └── 783264766493/
        ├── CloudTrail/
        └── vpcflowlogs/
\`\`\`
`;
