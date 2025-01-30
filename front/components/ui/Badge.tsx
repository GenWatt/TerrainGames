import React from 'react'
import { View, ViewProps } from 'react-native'
import clsx from 'clsx'

export interface BadgeProps extends ViewProps {
    children?: React.ReactNode
}

function Badge({ children, className, ...props }: BadgeProps) {
    return (
        <View className={clsx('bg-primary rounded-2xl p-3', className)} {...props}>
            {children}
        </View>
    )
}

export default Badge