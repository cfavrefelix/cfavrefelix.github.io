import { useCallback } from "react";

const useShowPart = (selectedFilters: {
    [key: string]: string[];
}): (taxonomies?: 'all' | { [taxonomy: string]: string[] }) => boolean => {
    // Method for if a method should be shown based on the taxonomies for that part.
    return useCallback((taxonomies?: 'all' | { [taxonomy: string]: string[] }) => {

        if (taxonomies === 'all') {
            return true;
        }
        const selectedFiltersKeys = Object.keys(selectedFilters);

        // Check if a "_type" is selected
        const typeIndex = selectedFiltersKeys.findIndex((item) => item === '_type');
        if (typeIndex > -1) {
            if (taxonomies && taxonomies['_type']) {
                for (let i = 0; i < selectedFilters['_type'].length; i++) {
                    const thisOption = selectedFilters['_type'][i];
                    console.log(thisOption, taxonomies['_type']);
                    // If a match exists then it will continue on the outer loop to check the other taxonomies that are selected
                    if (taxonomies['_type'].includes(thisOption)) {
                        return true;
                    };
                }
                return false;
            }
            // Remove type from the taxonomy list
            selectedFiltersKeys.splice(typeIndex, 1);
        }

        // If no filters are added to this item
        if (!taxonomies) {
            return false;
        }
        
        if (selectedFiltersKeys.length < 1) {
            return true;
        }

        if (Object.keys(taxonomies).filter(key => key !== '_type').length === 0) {
            return true;
        }

        // Outer loop label is used to skip back to this for loop
        outerLoop: for (let index = 0; index < selectedFiltersKeys.length; index++) {
            const thisKey = selectedFiltersKeys[index];

            // If a taxonomy is selected, but doesn't exist on this element, then don't show
            if (!taxonomies[thisKey] || taxonomies[thisKey].length < 0) {
                // unless it's "_type"
                return thisKey === "_type";
            }

            // If a taxonomy exists then loop through the selected options and check that at least one match exists
            for (let index2 = 0; index2 < selectedFilters[thisKey].length; index2++) {
                const thisOption = selectedFilters[thisKey][index2];

                // If a match exists then it will continue on the outer loop to check the other taxonomies that are selected
                if (taxonomies[thisKey].includes(thisOption)) {
                    continue outerLoop;
                };
            }

            // If it gets to here then a selected taxonomy is not present on this component
            return false;
        }

        return true;
    }, [selectedFilters]);
}
export default useShowPart;