import {suggestIssue} from './ErrorUtils';

export Meta from './Meta';

export function includePage() {
  suggestIssue(
    'Sitegen.includePage() should have been transformed by build pipeline'
  );
}

export function includePages() {
  suggestIssue(
    'Sitegen.includePages() should have been transformed by build pipeline'
  );
}

export function link() {
  suggestIssue(
    'Sitegen.link() should have been transformed by build pipeline'
  );
}

export function links() {
  suggestIssue(
    'Sitegen.links() should have been transformed by build pipeline'
  );
}

export function page() {
  suggestIssue(
    'Sitegen.page() should have been transformed by build pipeline'
  );
}

export function pages() {
  suggestIssue(
    'Sitegen.pages() should have been transformed by build pipeline'
  );
}
