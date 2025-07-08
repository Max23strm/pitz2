enum eventTypeName {
    Quinces = 'Torneo 15s',
    Entrenamiento = 'Entrenamiento',
    Sevens = 'Torneo 7s',
    Tens = 'Torneo 10s',
}


interface generalEvent {
    date: string
    event_name: string
    event_state: '1' | '2' | '0'
    event_type_uid: string
    event_uid: string
    type_name: eventTypeName.Entrenamiento | eventTypeName.Quinces | eventTypeName.Sevens | eventTypeName.Tens
}

interface eventType {
    event_type_uid: string
    event_type_name: eventTypeName.Entrenamiento | eventTypeName.Quinces | eventTypeName.Sevens | eventTypeName.Tens
}
