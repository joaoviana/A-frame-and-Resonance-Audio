//utilities for just random stuff that might be useful in many places

const setAllRoomProperties = ((material) => {
    let roomPropertiesObj = {
        left: material,
        right: material,
        front: material,
        back: material,
        down: material,
        up: material,
    };
    return roomPropertiesObj;
});

const setAllRoomDimensions = ((dimension) => {
    let roomDimensionsObj = {
        width: dimension,
        height: dimension,
        depth: dimension,
    };
    return roomDimensionsObj;
});