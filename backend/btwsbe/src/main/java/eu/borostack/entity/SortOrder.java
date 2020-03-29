package eu.borostack.entity;

public enum SortOrder {
    PRICE_ASC, PRICE_DESC;

    public static SortOrder getByString(final String sort) {
        for (final SortOrder sortOrder : SortOrder.values()) {
            if (sortOrder.name().equals(sort)) {
                return sortOrder;
            }
        }
        return null;
    }
}
