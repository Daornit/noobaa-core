/* Copyright (C) 2016 NooBaa */
'use strict';

const S3Error = require('../s3_errors').S3Error;

/**
 * http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketDELETEInventoryConfiguration.html
 */
function delete_bucket_inventory(req) {
    return req.rpc_client.bucket.read_bucket({ name: req.params.bucket })
        .then(bucket_info => {
            if (!bucket_info.cloud_sync ||
                bucket_info.cloud_sync.status === 'NOTSET') {
                throw new S3Error(S3Error.ReplicationConfigurationNotFoundError);
            }
            return req.rpc_client.bucket.delete_cloud_sync({
                name: req.params.bucket,
            });
        });
}

module.exports = {
    handler: delete_bucket_inventory,
    body: {
        type: 'empty',
    },
    reply: {
        type: 'empty',
    },
};