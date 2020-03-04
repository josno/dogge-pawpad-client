const Dogs = [
	{
		id: 1,
		dog_name: 'Winky',
		profile_img:
			'https://raw.githubusercontent.com/josno/pawpad-client/master/src/dog-images/Winky.jpg',
		spayedNeutered: true,
		shotsCompleted: [
			{ shot_name: 'Rabies', isCompleted: true },
			{ shot_name: 'Complex I', isCompleted: true },
			{ shot_name: 'Complex II', isCompleted: false },
			{ shot_name: 'Serum', isCompleted: false }
		],
		gender: 'Male',
		age: '6 months',
		arrival_date: new Date(2019, 12, 31),
		medical_notes_modified_date: new Date(),
		medical_notes_text: 'need more information',
		additional_notes_modified_date: new Date(),
		additional_notes_text: 'need more information',
		info_updated_by: 'Melanie',
		info_updated_on: new Date(2018, 11, 24)
	},
	{
		id: 2,
		dog_name: 'Coska',
		profile_img:
			'https://raw.githubusercontent.com/josno/pawpad-client/master/src/dog-images/Coska.jpg',
		spayedNeutered: false,
		shotsCompleted: [
			{ shot_name: 'Rabies', isCompleted: true },
			{ shot_name: 'Complex I', isCompleted: false },
			{ shot_name: 'Complex II', isCompleted: false },
			{ shot_name: 'Serum', isCompleted: false }
		],
		gender: 'Male',
		age: '4 years',
		arrival_date: new Date(2019, 10, 31),
		medical_notes: {
			modified_date: new Date(),
			text: 'need more information'
		},
		additional_notes_modified_date: new Date(),
		additional_notes_text: 'need more information',
		info_updated_by: 'Sarah',
		info_updated_on: new Date(2019, 2, 15)
	}
];

export default Dogs;
