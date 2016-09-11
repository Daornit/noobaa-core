'use strict';

/**
 *
 * BUCKET API
 *
 * client (currently web client) talking to the web server to work on bucket
 *
 */
module.exports = {

    id: 'bucket_api',

    methods: {

        create_bucket: {
            method: 'POST',
            params: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string',
                    },
                    tiering: {
                        type: 'string',
                    },
                    tag: {
                        type: 'string',
                    },
                }
            },
            reply: {
                $ref: '#/definitions/bucket_info'
            },
            auth: {
                system: 'admin'
            }
        },

        read_bucket: {
            method: 'GET',
            params: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string',
                    },
                }
            },
            reply: {
                $ref: '#/definitions/bucket_info'
            },
            auth: {
                system: 'admin'
            }
        },

        update_bucket: {
            method: 'PUT',
            params: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string',
                    },
                    new_name: {
                        type: 'string',
                    },
                    tiering: {
                        type: 'string',
                    },
                    new_tag: {
                        type: 'string',
                    }
                }
            },
            auth: {
                system: 'admin'
            }
        },

        delete_bucket: {
            method: 'DELETE',
            params: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string',
                    },
                }
            },
            auth: {
                system: 'admin'
            }
        },

        delete_bucket_lifecycle: {
            method: 'DELETE',
            params: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string',
                    },
                }
            },
            auth: {
                system: 'admin'
            }
        },

        list_buckets: {
            method: 'GET',
            reply: {
                type: 'object',
                required: ['buckets'],
                properties: {
                    buckets: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['name'],
                            properties: {
                                name: {
                                    type: 'string'
                                },
                            }
                        }
                    }
                }
            },
            auth: {
                system: 'admin'
            }
        },

        list_bucket_s3_acl: {
            method: 'GET',
            params: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string'
                    }
                }
            },
            reply: {
                $ref: '#/definitions/bucket_s3_acl'
            },
            auth: {
                system: 'admin'
            }
        },

        update_bucket_s3_acl: {
            method: 'PUT',
            params: {
                type: 'object',
                required: ['name', 'access_control'],
                properties: {
                    name: {
                        type: 'string',
                    },
                    access_control: {
                        $ref: '#/definitions/bucket_s3_acl'
                    }
                }
            },
            auth: {
                system: 'admin'
            }
        },

        get_cloud_sync: {
            method: 'GET',
            params: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string',
                    },
                }
            },
            reply: {
                $ref: '#/definitions/cloud_sync_info'
            },
            auth: {
                system: 'admin'
            }
        },

        get_all_cloud_sync: {
            method: 'GET',
            reply: {
                type: 'array',
                items: {
                    $ref: '#/definitions/cloud_sync_info'
                }
            },
            auth: {
                system: 'admin'
            }
        },

        delete_cloud_sync: {
            method: 'DELETE',
            params: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string'
                    }
                }
            },
            auth: {
                system: 'admin'
            }
        },

        set_cloud_sync: {
            method: 'PUT',
            params: {
                type: 'object',
                required: ['name', 'policy'],
                properties: {
                    name: {
                        type: 'string'
                    },
                    connection: {
                        type: 'string'
                    },
                    target_bucket: {
                        type: 'string'
                    },
                    policy: {
                        $ref: '#/definitions/cloud_sync_policy'
                    }
                }
            },
            auth: {
                system: 'admin'
            }
        },

        update_cloud_sync: {
            method: 'PUT',
            params: {
                type: 'object',
                required: ['name', 'policy'],
                properties: {
                    name: {
                        type: 'string'
                    },
                    policy: {
                        $ref: '#/definitions/cloud_sync_policy'
                    }
                }
            },
            auth: {
                system: 'admin'
            }
        },

        toggle_cloud_sync: {
            method: 'PUT',
            params: {
                type: 'object',
                required: ['name', 'pause'],
                properties: {
                    name: {
                        type: 'string'
                    },
                    pause: {
                        type: 'boolean'
                    }
                }
            },
            auth: {
                system: 'admin'
            }
        },

        // TODO Removed by request of Ohad, because seems like we won't be using it
        /*generate_bucket_access: {
            method: 'PUT',
            params: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string',
                    }
                }
            },
            reply: {
                type: 'object',
                required: ['access_key', 'secret_key'],
                properties: {
                    access_key: {
                        type: 'string',
                    },
                    secret_key: {
                        type: 'string',
                    }
                }
            },
            auth: {
                system: 'admin'
            }
        },*/

        get_cloud_buckets: {
            method: 'GET',
            params: {
                type: 'object',
                required: ['connection'],
                properties: {
                    connection: {
                        type: 'string'
                    }
                }
            },
            reply: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            auth: {
                system: 'admin'
            }
        },
        set_bucket_lifecycle_configuration_rules: {
            method: 'PUT',
            params: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    rules: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['id', 'prefix', 'status', 'expiration'],
                            properties: {
                                id: {
                                    type: 'string'
                                },
                                prefix: {
                                    type: 'string'
                                },
                                status: {
                                    type: 'string'
                                },
                                expiration: {
                                    type: 'object',
                                    properties: {
                                        days: {
                                            type: 'integer'
                                        },
                                        date: {
                                            format: 'idate'
                                        },
                                        expired_object_delete_marker: {
                                            type: 'boolean'
                                        }

                                    }
                                },
                                abort_incomplete_multipart_upload: {
                                    type: 'object',
                                    properties: {
                                        days_after_initiation: {
                                            type: 'integer'
                                        },
                                    }
                                },
                                transition: {
                                    type: 'object',
                                    properties: {
                                        date: {
                                            format: 'idate'
                                        },
                                        storage_class: {
                                            $ref: '#/definitions/storage_class_enum'
                                        }
                                    }
                                },
                                noncurrent_version_expiration: {
                                    type: 'object',
                                    properties: {
                                        noncurrent_days: {
                                            type: 'integer'
                                        },
                                    }
                                },
                                noncurrent_version_transition: {
                                    type: 'object',
                                    properties: {
                                        noncurrent_days: {
                                            type: 'integer'
                                        },
                                        storage_class: {
                                            $ref: '#/definitions/storage_class_enum'
                                        }
                                    }
                                },
                            }
                        },
                    }
                }
            },
            auth: {
                system: 'admin'
            },
        },
        get_bucket_lifecycle_configuration_rules: {
            method: 'GET',
            params: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    }
                }
            },
            reply: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['id', 'prefix', 'status', 'expiration'],
                    properties: {
                        id: {
                            type: 'string'
                        },
                        prefix: {
                            type: 'string'
                        },
                        status: {
                            type: 'string'
                        },
                        last_sync: {
                            format: 'idate'
                        },
                        expiration: {
                            type: 'object',
                            properties: {
                                days: {
                                    type: 'integer'
                                },
                                date: {
                                    format: 'idate'
                                },
                                expired_object_delete_marker: {
                                    type: 'boolean'
                                }

                            }
                        },
                        abort_incomplete_multipart_upload: {
                            type: 'object',
                            properties: {
                                days_after_initiation: {
                                    type: 'integer'
                                },
                            }
                        },
                        transition: {
                            type: 'object',
                            properties: {
                                date: {
                                    format: 'idate'
                                },
                                storage_class: {
                                    $ref: '#/definitions/storage_class_enum'
                                }
                            }
                        },
                        noncurrent_version_expiration: {
                            type: 'object',
                            properties: {
                                noncurrent_days: {
                                    type: 'integer'
                                },
                            }
                        },
                        noncurrent_version_transition: {
                            type: 'object',
                            properties: {
                                noncurrent_days: {
                                    type: 'integer'
                                },
                                storage_class: {
                                    $ref: '#/definitions/storage_class_enum'
                                }
                            }
                        },
                    },
                }
            },
            auth: {
                system: 'admin'
            }
        }

    },

    definitions: {

        bucket_info: {
            type: 'object',
            required: ['name', 'tiering', 'storage', 'data', 'num_objects'],
            properties: {
                name: {
                    type: 'string',
                },
                tiering: {
                    $ref: 'tiering_policy_api#/definitions/tiering_policy'
                },
                storage: {
                    $ref: 'common_api#/definitions/storage_info'
                },
                data: {
                    type: 'object',
                    properties: {
                        // This is the sum of all compressed chunks that are related to the bucket.
                        // Which means that it includes dedup and compression, but not replicas.
                        size_reduced: {
                            $ref: 'common_api#/definitions/bigint'
                        },
                        // This is logical size aggregation of objects that are related to the bucket.
                        size: {
                            $ref: 'common_api#/definitions/bigint'
                        },
                        // This is the actual free space of the bucket considering data placement policy.
                        // On mirror it is the minimum free space of the pools, on spread it is the sum.
                        // Also we divide by replicas in order to get the actual size that can be written.
                        actual_free: {
                            $ref: 'common_api#/definitions/bigint'
                        },
                    }
                },
                num_objects: {
                    type: 'integer'
                },
                cloud_sync: {
                    $ref: '#/definitions/cloud_sync_info'
                },
                tag: {
                    type: 'string'
                },
                demo_bucket: {
                    type: 'boolean'
                },
                stats: {
                    type: 'object',
                    properties: {
                        reads: {
                            type: 'integer'
                        },
                        writes: {
                            type: 'integer'
                        },
                        last_read: {
                            format: 'idate'
                        },
                        last_write: {
                            format: 'idate'
                        },
                    },
                }
            }
        },

        cloud_sync_info: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                endpoint: {
                    type: 'string'
                },
                access_key: {
                    type: 'string'
                },
                target_bucket: {
                    type: 'string'
                },
                policy: {
                    $ref: '#/definitions/cloud_sync_policy'
                },
                health: {
                    type: 'boolean'
                },
                status: {
                    $ref: '#/definitions/api_cloud_sync_status'
                },
                last_sync: {
                    format: 'idate'
                }
            }
        },

        cloud_sync_policy: {
            type: 'object',
            required: ['schedule_min'],
            properties: {
                schedule_min: {
                    type: 'integer'
                },
                c2n_enabled: {
                    type: 'boolean',
                },
                n2c_enabled: {
                    type: 'boolean',
                },
                //If true, only additions will be synced
                additions_only: {
                    type: 'boolean',
                }
            }
        },

        bucket_s3_acl: {
            type: 'array',
            items: {
                type: 'object',
                required: ['account', 'is_allowed'],
                properties: {
                    account: {
                        type: 'string'
                    },
                    is_allowed: {
                        type: 'boolean'
                    }
                }
            }
        },

        api_cloud_sync_status: {
            enum: ['PENDING', 'SYNCING', 'PAUSED', 'UNABLE', 'SYNCED', 'NOTSET'],
            type: 'string',
        },

        sync_status_enum: {
            enum: ['IDLE', 'SYNCING'],
            type: 'string',
        },
        storage_class_enum: {
            enum: ['STANDARD_IA', 'GLACIER'],
            type: 'string'
        }
    },
};
