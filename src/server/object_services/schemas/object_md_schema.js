/* Copyright (C) 2016 NooBaa */
'use strict';

module.exports = {
    id: 'object_md_schema',
    type: 'object',
    required: [
        '_id',
        'system',
        'bucket',
        'key',
        'content_type',
    ],
    properties: {

        _id: {
            objectid: true
        },

        deleted: {
            date: true
        },

        system: {
            objectid: true
        },

        bucket: {
            objectid: true
        },

        // the object key is sort of a path in the bucket namespace
        key: {
            type: 'string'
        },

        version_seq: { type: 'integer' },

        version_past: {
            // version_past = undefined  means latest version.
            // version_past = true       means non latest.
            // version_past = false      unused!
            type: 'boolean'
        },

        version_enabled: {
            // version_enabled = true       means a listed version
            // version_enabled = undefined  means 'null' version (backward compatible for objects that existed before introducing versioning)
            // version_enabled = false      unused!
            // We defined it instead of version_null for backward compatibility on upgrades.
            // The reason we have to separate it from version_seq is that 'null' version 
            // also has to be sorted by creation order when listing versions.
            type: 'boolean'
        },

        delete_marker: { type: 'boolean' },

        // size in bytes
        // NOTE: only updated once upload ends
        size: {
            type: 'integer'
        },

        // number of objects parts created for this object
        // NOTE: only updated once upload ends
        num_parts: {
            type: 'integer'
        },

        // MIME
        content_type: {
            type: 'string'
        },

        // upload_size is filled for objects while uploading,
        // and ultimatly removed once the write is done
        upload_size: {
            type: 'integer'
        },

        upload_started: {
            objectid: true
        },

        create_time: {
            date: true
        },

        // etag is the object md5 hex for objects uploaded in single action.
        // for multipart upload etag is a special aggregated md5 of the parts md5's.
        etag: {
            type: 'string',
        },

        // hashes are saved when provided during upload
        // md5 is used for etag of non-multipart uploads
        md5_b64: {
            type: 'string'
        },
        sha256_b64: {
            type: 'string'
        },

        // xattr saved as free form object
        xattr: {
            type: 'object',
            additionalProperties: true,
            properties: {}
        },

        // Statistics
        stats: {
            type: 'object',
            properties: {
                reads: {
                    type: 'integer'
                },
                last_read: {
                    date: true
                },
            }
        },

    }
};
