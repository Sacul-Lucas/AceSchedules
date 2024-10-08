export const formatCaracteristicas = (caracteristicas: string): string[] => {
    const caracteristicasArray = caracteristicas
        .replace(/"/g, '')
        .split(/\n/)
        .map(item => item.trim())
        .filter(item => item);

    return caracteristicasArray
};

export const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ');

    if (names.length === 0) {
        return '';
    }

    const firstNameInitial = names[0].charAt(0).toUpperCase();
    const lastNameInitial = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';

    return lastNameInitial ? `${firstNameInitial}${lastNameInitial}` : firstNameInitial;
}