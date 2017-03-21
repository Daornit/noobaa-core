import template from './update-system-name-modal.html';
import BaseViewModel from 'components/base-view-model';
import { updateHostname } from 'actions';
import ko from 'knockout';
import { lockActiveModal } from 'dispatchers';

class UpdatingSystemNameModalViewModel extends BaseViewModel {
    constructor({ name, onClose }) {
        super();

        this.name = name;
        this.onClose = onClose;
        this.updating = ko.observable(false);
    }

    update() {
        this.updating(true);
        lockActiveModal();
        updateHostname(ko.unwrap(this.name));
    }

    cancel() {
        this.onClose();
    }
}

export default {
    viewModel: UpdatingSystemNameModalViewModel,
    template: template
};