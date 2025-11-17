
export interface PolicyStatement {
  Sid: string;
  Effect: 'Allow' | 'Deny';
  Principal: {
    Service: string | string[];
  };
  Action: string | string[];
  Resource: string | string[];
  Condition?: {
    [key: string]: {
      [key: string]: string | string[];
    };
  };
}

export interface S3Policy {
  Version: string;
  Statement: PolicyStatement[];
}

export interface ProjectDetails {
    sourceAccount: string;
    destAccount: string;
    s3BucketName: string;
    s3BucketArn: string;
}

export interface VideoStep {
    part: string;
    title: string;
    description: string;
    details: string[];
}
