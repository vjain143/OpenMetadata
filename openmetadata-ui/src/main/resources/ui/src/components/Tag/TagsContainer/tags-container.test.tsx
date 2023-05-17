/*
 *  Copyright 2022 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { getByTestId, render } from '@testing-library/react';
import { NO_DATA_PLACEHOLDER } from 'constants/constants';
import React from 'react';
import TagsContainer from './tags-container';

const tagList = [
  { fqn: 'tag 1', source: 'Classification' },
  { fqn: 'tag 2', source: 'Classification' },
  { fqn: 'tag 3', source: 'Glossary' },
];

const onCancel = jest.fn();
const onSelectionChange = jest.fn();

jest.mock('utils/UserDataUtils', () => {
  return {
    fetchAllUsers: jest.fn(),
    fetchUserProfilePic: jest.fn(),
    getUserDataFromOidc: jest.fn(),
    getUserProfilePic: jest.fn(),
    matchUserDetails: jest.fn(),
  };
});

jest.mock('components/Tag/Tags/tags', () => {
  return jest.fn().mockReturnValue(<p>tags</p>);
});

describe('Test TagsContainer Component', () => {
  it('Component should render', () => {
    const { container } = render(
      <TagsContainer
        editable
        selectedTags={[]}
        tagList={tagList}
        onCancel={onCancel}
        onSelectionChange={onSelectionChange}
      />
    );
    const TagContainer = getByTestId(container, 'tag-container');
    const AsyncSelect = getByTestId(container, 'tag-selector');

    expect(TagContainer).toBeInTheDocument();
    expect(AsyncSelect).toBeInTheDocument();
  });

  it('Should have two buttons', () => {
    const { container } = render(
      <TagsContainer
        editable
        selectedTags={[]}
        tagList={tagList}
        onCancel={onCancel}
        onSelectionChange={onSelectionChange}
      />
    );
    const cancelButton = getByTestId(container, 'cancelAssociatedTag');
    const saveButton = getByTestId(container, 'saveAssociatedTag');

    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it('Should show no data placeholder when tags is empty and only have view access', () => {
    const { container } = render(
      <TagsContainer
        editable={false}
        selectedTags={[]}
        showAddTagButton={false}
        tagList={[]}
        onSelectionChange={onSelectionChange}
      />
    );
    const tagContainer = getByTestId(container, 'tag-container');
    const noTagContainer = getByTestId(container, 'no-tags');

    expect(tagContainer).toBeInTheDocument();
    expect(noTagContainer).toBeInTheDocument();
    expect(noTagContainer).toContainHTML(NO_DATA_PLACEHOLDER);
  });
});
