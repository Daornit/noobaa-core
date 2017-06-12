/* Copyright (C) 2016 NooBaa */

import template from './account-details-form.html';
import { state$ } from 'state';
import Observer from 'observer';
import ko from 'knockout';

class AccountDetailsFormViewModel extends Observer {
    constructor() {
        super();

        this.accountName = ko.observable();
        this.role = ko.observable();
        this.isCurrentUser = ko.observable();
        this.changePasswordButtonLabel = ko.observable();
        this.disableResetPassword = ko.observable();

        this.profileInfo = [
            {
                label: 'Account name',
                value: this.accountName
            },
            {
                label: 'Role',
                value: this.role
            },
        ];

        this.observe(
            state$.getMany(
                'accounts',
                ['location', 'params', 'account'],
                ['session', 'user']
            ),
            this.onAccount
        );

        // TODO: Move the modals into Modal Maneger
        this.isPasswordModalVisible = ko.observable(false);
    }

    onAccount([ accounts, accountName, currentUser ]) {
        const account = accounts[accountName];
        if (!account) return;

        const { isOwner } = account;
        const isCurrentUser = currentUser === accountName;

        this.accountName(accountName);
        this.role(isOwner ? 'Owner' : 'Admin');
        this.isCurrentUser(isCurrentUser);
        this.changePasswordButtonLabel(isCurrentUser ? 'Change Password' : 'Reset Password');
        this.disableResetPassword(!account.hasLoginAccess);
    }

    showPasswordModal() {
        this.isPasswordModalVisible(true);
    }

    hidePasswordModal() {
        this.isPasswordModalVisible(false);
    }
}

export default {
    viewModel: AccountDetailsFormViewModel,
    template: template
};
