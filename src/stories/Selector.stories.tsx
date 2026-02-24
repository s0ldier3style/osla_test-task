import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import PersonSelector from '../entities/task/ui/create-task/person-selector/person-selector';
import { persons } from '../shared/data/persons';

const meta: Meta<typeof PersonSelector> = {
  component: PersonSelector,
};

export default meta;
type Story = StoryObj<typeof PersonSelector>;

export const Default: Story = {
  args: {
    placeholder: 'Выберите',
    onSelect: (person: string) => console.log('Выбран исполнитель:', person),
    onClear: () => console.log('Очистить выбор'),
  },
};

export const WithSelectedAssignee: Story = {
  args: {
    placeholder: 'Выберите',
    onSelect: (assignee: string) =>
      console.log('Выбран исполнитель:', assignee),
    onClear: () => console.log('Очистить выбор'),
    value: 'Петряшникова Д. Р.',
  },
};

export const WithDropdownOpen: Story = {
  args: {
    placeholder: 'Выберите',
    onSelect: (assignee: string) =>
      console.log('Выбран исполнитель:', assignee),
    onClear: () => console.log('Очистить выбор'),
  },
  render: (args) => {
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(true);

    return (
      <div style={{ position: 'relative' }}>
        <PersonSelector
          {...args}
          onSelect={(person) => {
            setSelectedPerson(person);
            setShowDropdown(false);
          }}
          onClear={() => setSelectedPerson(null)}
        />
        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              width: '100%',
              background: 'white',
              border: '1px solid #ccc',
            }}
          >
            {persons.map((person) => (
              <div
                key={person.id}
                style={{ padding: '10px', cursor: 'pointer' }}
                onClick={() => {
                  setSelectedPerson(person.name);
                  setShowDropdown(false);
                }}
              >
                {person.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};
