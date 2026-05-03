import { extend } from 'flarum/common/extend';
import Pagination from 'flarum/common/components/Pagination';

export default function () {
    extend(Pagination.prototype, 'view', function (vdom) {
        const children = vdom.children;

        if (!Array.isArray(children)) {
            return;
        }

      	children.forEach((child) => {
          	if (!child?.attrs?.icon || child.attrs['data-rtl-flipped']) {
              	return;
          	}

			const icon = child.attrs.icon;

			const flipMap = {
				'fas fa-chevron-left': 'fas fa-chevron-right',
				'fas fa-chevron-right': 'fas fa-chevron-left',
				'fas fa-step-backward': 'fas fa-step-forward',
				'fas fa-step-forward': 'fas fa-step-backward',
			};
          
			if (flipMap[icon]) {
				child.attrs.icon = flipMap[icon];
				child.attrs['data-rtl-flipped'] = 'true';
			}
      	});
    });
}
