import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useState, useEffect } from 'react';

const GenerateRecommendations = ({ spotify, handleGenerateClick }) => {
    // The recommended song form will take in a 3 field
    // seed genres - drop down box populated from "Get Available Genre Seeds" endpoint
    // seed track - maybe the form can take in a spotify link to the track and I will request for the id?
    // seed artist - maybe a small search box so the user can select from the results. This could work for the seed tracks too.
    // Advanced settings
    // Allow for more advanced specification using some of the more advanced filters like energy level, instrumentalness, liveness, danceability...
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [seedGenres, setSeedGenres] = useState([]);

    const [selectedGenreSeeds, setSelectedGenreSeeds] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);

    useEffect(() => {
        const getGenreSeeds = async () => {
            const response = await spotify.getAvailableGenreSeeds();
            const genres = response.genres.map((genre) => {return {value: genre, label: genre}});
            setSeedGenres(genres);
        };

        getGenreSeeds();
    }, [spotify]);

    const filterArtists = async (inputValue) => {
        const response = await spotify.searchArtists(inputValue);
        const artists = response.artists.items.map((item) => {return {value: item.id, label: item.name}});
        return artists;
    };

    const filterTracks = async (inputValue) => {
        const response = await spotify.searchTracks(inputValue);
        const tracks = response.tracks.items.map((item) => {return {value: item.id, label: item.name + " by " + item.artists[0].name}});
        return tracks;
    }

    const isAtMaxSeedValues = () => {
        const total = selectedGenreSeeds.length + selectedArtists.length + selectedTracks.length;
        const result = total >= 5
        if (result)
        {
            setShowAlert(true);
            setAlertMessage("Maximum of 5 values in total across the 3 options!");
        }

        return result;
    }

    const isRemovingOptions = (selectedOptionsLength) => {
        const result = selectedOptionsLength < selectedGenreSeeds.length;
        if (result)
            setShowAlert(false);

        return result;
    }

    const handleGenreSelectChange = (selectedOptions) => {
        if (isRemovingOptions(selectedOptions.length))
            setSelectedGenreSeeds(selectedOptions);
        else
            !isAtMaxSeedValues() && setSelectedGenreSeeds(selectedOptions);
    };

    const handleArtistSelectChange = (selectedOptions) => {
        if (isRemovingOptions(selectedOptions.length))
            setSelectedArtists(selectedOptions);
        else
            !isAtMaxSeedValues() && setSelectedArtists(selectedOptions);
    };

    const handleTrackSelectChange = (selectedOptions) => {
        if (isRemovingOptions(selectedOptions.length))
            setSelectedTracks(selectedOptions);
        else
            !isAtMaxSeedValues() && setSelectedTracks(selectedOptions);
    };

    return (
        <Form className='generate-songs-form'>
            {
                showAlert && <Alert>{alertMessage}</Alert>
            }
            <Form.Group className="mb-3">
                <Select className="mb-3"
                    options={seedGenres}
                    value={selectedGenreSeeds}
                    onChange={handleGenreSelectChange}
                    placeholder="Select Genres"
                    isSearchable
                    isMulti
                />
                <AsyncSelect className="mb-3"
                    cacheOptions
                    loadOptions={filterArtists}
                    value={selectedArtists}
                    onChange={handleArtistSelectChange}
                    placeholder="Search Artists"
                    isMulti
                />
                <AsyncSelect className="mb-3"
                    cacheOptions
                    loadOptions={filterTracks}
                    value={selectedTracks}
                    onChange={handleTrackSelectChange}
                    placeholder="Search Tracks"
                    isMulti
                />
            </Form.Group>
            <Button onClick={() => handleGenerateClick(selectedGenreSeeds, selectedArtists, selectedTracks)} >
                Generate
            </Button>
        </Form>
    );
};

export default GenerateRecommendations;