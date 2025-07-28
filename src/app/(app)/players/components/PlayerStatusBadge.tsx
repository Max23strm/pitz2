import { Badge } from '@mantine/core'
import React from 'react'

const PlayerStatusBadge = ({ status }: {status : number}) => {
    return (
        <Badge
            variant="gradient"
            gradient={{
                from: status === 1 ? "violet" : "pink",
                to: status === 1 ? "cyan" : "orange",
                deg: 90,
            }}
        >
            {status === 1 ? "Activo" : "Inactivo"}
        </Badge>
    )
}

export default PlayerStatusBadge